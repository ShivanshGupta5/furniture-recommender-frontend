// src/components/Layout.jsx
import React from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#0a0a0a", color: "#0ff", fontFamily: "'Orbitron', sans-serif", overflowX: "hidden", position: "relative" }}>
      {/* Neon Grid Background */}
      <Box
        sx={{
          position: "fixed",
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
          position: "fixed",
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

      {/* Glowing Navbar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "rgba(20,20,30,0.7)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,255,255,0.3)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "Orbitron, sans-serif", color: "#0ff" }}>
          🪑 Furniture Recommender
        </Typography>

        {!isMobile && (
          <Box>
            <Button sx={{ color: "#0ff", mx: 1 }} component={Link} to="/">Recommend</Button>
            <Button sx={{ color: "#0ff", mx: 1 }} component={Link} to="/analytics">Analytics</Button>
          </Box>
        )}
      </Box>

      {/* Page Content */}
      <Box sx={{ flex: 1, width: "100%", mt: 3, position: "relative", zIndex: 1 }}>
        {children}
      </Box>

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
}
