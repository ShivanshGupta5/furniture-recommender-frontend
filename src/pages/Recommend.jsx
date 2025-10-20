// src/pages/Recommend.jsx
import { useState } from "react";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ChatUI from "../components/ChatUI";
import ProductCard from "../components/ProductCard";

const RecommendationPage = () => {
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSend = async (input) => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setProducts([]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://furniture-recommender-backend-2.onrender.com/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const data = await response.json();

      const assistantMsg =
        data.length > 0
          ? `Found ${data.length} furniture recommendation${data.length > 1 ? "s" : ""}!`
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
    } finally {
      setLoading(false);
    }
  };

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
        width: "94.8vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "stretch",
        gap: 3,
        p: { xs: 2, sm: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#0a0a0a",
      }}
    >
      {/* Animated Background */}
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
            "radial-gradient(circle at 50% 50%, rgba(255,0,255,0.05), transparent 70%)",
          animation: "pulseBackground 10s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />

      {/* Chat Panel */}
      <Paper
        elevation={8}
        sx={{
          flex: isMobile ? "none" : "0 0 40%",
          width: isMobile ? "100%" : "40%",
          height: isMobile ? "auto" : "80vh",
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
          flex: isMobile ? "none" : "1",
          width: isMobile ? "100%" : "60%",
          height: isMobile ? "auto" : "80vh",
          overflowY: "auto",
          borderRadius: 3,
          p: 2,
          bgcolor: "rgba(30,30,40,0.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,255,255,0.2)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: 40,
                height: 40,
                border: "4px solid #0ff",
                borderTop: "4px solid transparent",
                borderRadius: "50%",
              }}
            />
          </Box>
        ) : products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "24px",
              width: "100%",
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

      {/* Keyframes */}
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
