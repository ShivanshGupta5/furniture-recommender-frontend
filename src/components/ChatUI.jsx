// src/components/ChatUI.jsx
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

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    onSend(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSend(input);
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

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "80%",
                    bgcolor:
                      msg.sender === "user"
                        ? "rgba(0,255,255,0.2)"
                        : msg.text.includes("recommendation")
                        ? "rgba(0,255,255,0.3)"
                        : "rgba(50,0,50,0.5)",
                    color: "#fff",
                    boxShadow:
                      msg.sender === "user"
                        ? "0 0 10px #0ff"
                        : "0 0 10px #ff00ff",
                    borderLeft:
                      msg.text.includes("recommendation") ? "4px solid #0ff" : "none",
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Box>
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
          placeholder="Describe the furniture you want..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(0,0,0,0.5)",
              color: "#0ff",
              borderRadius: 2,
              border: "1px solid #0ff",
            },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#0ff" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0ff",
            },
            "& .MuiInputBase-input": { color: "#0ff" },
          }}
          multiline
          maxRows={4}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "#0ff",
            color: "#000",
            "&:hover": { bgcolor: "#0ff", boxShadow: "0 0 15px #0ff" },
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}
