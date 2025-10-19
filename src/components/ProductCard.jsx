import React from "react";
import { Card, CardContent, CardMedia, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
    >
      <Tooltip
        title={
          <Typography variant="body2" sx={{ maxWidth: 250 }}>
            {item.description || "No description available."}
          </Typography>
        }
        arrow
        placement="top"
      >
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,255,255,0.2)",
            transition: "transform 0.3s, box-shadow 0.3s, border 0.3s",
            bgcolor: "rgba(20,20,30,0.6)",
            border: "1px solid rgba(0,255,255,0.2)",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px #0ff, 0 0 40px #0ff33a",
              border: "1px solid #0ff",
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={item.img}
            alt={item.name}
            sx={{
              filter: "brightness(0.9) contrast(1.1)",
              transition: "filter 0.3s",
              "&:hover": { filter: "brightness(1) contrast(1.2)" },
            }}
          />
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#0ff",
                fontWeight: 600,
                textShadow: "0 0 5px #0ff",
              }}
            >
              {item.name}
            </Typography>
          </CardContent>
        </Card>
      </Tooltip>
    </motion.div>
  );
}
