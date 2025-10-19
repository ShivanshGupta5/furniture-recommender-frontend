import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Box, Avatar, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatUI({ messages, onSend }) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Smooth auto-scroll when new message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  // Framer Motion variants for chat messages
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Scrollable chat messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2, pr: 1 }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box
                sx={{
                  display: "flex",
                  mb: 1,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.sender === "assistant" && (
                  <Avatar sx={{ width: 30, height: 30, mr: 1 }}>🤖</Avatar>
                )}

                {msg.text.includes("recommendation") ? (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: "80%",
                      bgcolor: "#555",
                      color: "#fff",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                      borderLeft: "4px solid #1976d2",
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: "80%",
                      bgcolor: msg.sender === "user" ? "#1976d2" : "#444",
                      color: "#fff",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                    }}
                  >
                    {msg.text}
                  </Box>
                )}
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </Box>

      {/* Input area fixed at bottom */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": { bgcolor: "#3b3a4c", color: "#fff", borderRadius: 2 },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
            "& .MuiInputBase-input": { color: "#fff" },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" }, borderRadius: 2, textTransform: "none" }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}
