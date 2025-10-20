// src/components/ProductCard.jsx
import React from "react";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{ borderRadius: "12px" }}
    >
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(30,30,40,0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid #0ff",
          boxShadow: "0 0 15px rgba(0,255,255,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.3s, border-color 0.3s",
          "&:hover": {
            borderColor: "#ff00ff",
            boxShadow: "0 0 20px #0ff, 0 0 15px #ff00ff, 0 0 25px #0ff inset",
            animation: "glowPulse 2s infinite",
          },
        }}
      >
        <motion.img
          src={item.img || "https://via.placeholder.com/200x150"}
          alt={item.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            marginBottom: "8px",
            boxShadow: "0 0 10px rgba(0,255,255,0.4)",
            transition: "box-shadow 0.3s",
          }}
          whileHover={{ boxShadow: "0 0 20px #0ff, 0 0 15px #ff00ff" }}
        />
        <Typography sx={{ color: "#0ff", fontWeight: "bold" }}>{item.name}</Typography>
        {item.brand && (
          <Typography sx={{ color: "#ff00ff", fontSize: 14 }}>{item.brand}</Typography>
        )}
        {item.price && (
          <Typography sx={{ color: "#aaa" }}>₹{item.price}</Typography>
        )}

        {/* Keyframes for glow pulse */}
        <style>
          {`
            @keyframes glowPulse {
              0% { box-shadow: 0 0 5px #0ff; }
              50% { box-shadow: 0 0 15px #0ff, 0 0 10px #ff00ff; }
              100% { box-shadow: 0 0 5px #0ff; }
            }
          `}
        </style>
      </Paper>
    </motion.div>
  );
}
