// src/components/Layout.jsx
import React from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#0a0a0a", color: "#0ff" }}>
      {/* Top Navigation */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#111",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: "1px solid rgba(0,255,255,0.3)",
        }}
      >
        <Typography variant="h5" sx={{ fontFamily: "Orbitron, sans-serif" }}>
          🪑 Furniture Recommender
        </Typography>
        {!isMobile && (
          <Box>
            <Button sx={{ color: "#0ff" }}>Recommend</Button>
            <Button sx={{ color: "#0ff" }}>Analytics</Button>
          </Box>
        )}
      </Box>

      {/* Page content */}
      <Box sx={{ flex: 1, width: "100%", overflowX: "hidden" }}>{children}</Box>
    </Box>
  );
}
