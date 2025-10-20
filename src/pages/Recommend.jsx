// frontend/src/pages/Recommend.jsx
import { useState } from "react";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ChatUI from "../components/ChatUI";
import ProductCard from "../components/ProductCard";

const RecommendationPage = () => {
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSend = async (input) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setProducts([]);

    try {
      const response = await fetch("https://furniture-recommender-backend-1.onrender.com/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();

      const assistantMsg =
        data.length > 0
          ? `Found ${data.length} furniture recommendation${data.length > 1 ? "s" : ""} for you!`
          : "No recommendations found.";

      setMessages((prev) => [...prev, { sender: "assistant", text: assistantMsg }]);
      setProducts([...data]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, something went wrong." },
      ]);
      setProducts([]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        gap: 3,
        p: 3,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0a0a0a",
      }}
    >
      {/* Animated Futuristic Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background:
            "repeating-linear-gradient(45deg, #0ff 0, #0ff 2px, transparent 2px, transparent 10px)",
          opacity: 0.05,
          animation: "moveBackground 20s linear infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.05), transparent 70%)",
          animation: "pulseBackground 10s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />

      {/* Chat Section */}
      <Paper
        elevation={8}
        sx={{
          flex: isMobile ? "none" : "0 0 35%",
          width: isMobile ? "100%" : "400px",
          height: isMobile ? "auto" : "75vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          bgcolor: "rgba(30,30,40,0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,255,255,0.2)",
          zIndex: 1,
        }}
      >
        <ChatUI messages={messages} onSend={handleSend} />
      </Paper>

      {/* Products Section */}
      <Paper
        elevation={8}
        sx={{
          flex: 1,
          minWidth: 300,
          height: isMobile ? "auto" : "75vh",
          overflowY: "auto",
          borderRadius: 3,
          p: 2,
          bgcolor: "rgba(30,30,40,0.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,255,255,0.2)",
          zIndex: 1,
        }}
      >
        {products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product, idx) => (
              <motion.div key={`${product.id}-${idx}`} variants={itemVariants}>
                <ProductCard item={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Typography
            variant="h6"
            sx={{ color: "#0ff", textAlign: "center", mt: 5, textShadow: "0 0 5px #0ff" }}
          >
            No recommendations yet. Start by asking for a furniture suggestion!
          </Typography>
        )}
      </Paper>

      {/* Contact Us Section */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(20,20,30,0.8)",
          color: "#0ff",
          border: "1px solid #0ff",
          textAlign: "center",
          backdropFilter: "blur(5px)",
          fontFamily: "Orbitron, sans-serif",
          boxShadow: "0 0 20px #0ff",
          zIndex: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Contact Us
        </Typography>
        <Typography variant="body2">Mobile: 9810392210</Typography>
        <Typography variant="body2">Email: sgupta11_be22@thapar.edu</Typography>
      </Box>

      {/* Keyframes for animations */}
      <style>
        {`
          @keyframes moveBackground {
            0% { transform: translate(0,0) rotate(0deg); }
            100% { transform: translate(-50%,-50%) rotate(360deg); }
          }
          @keyframes pulseBackground {
            0% { opacity: 0.03; }
            100% { opacity: 0.08; }
          }
        `}
      </style>
    </Box>
  );
};

export default RecommendationPage;
