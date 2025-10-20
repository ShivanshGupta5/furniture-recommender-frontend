// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";

const COLORS = ["#0ff", "#ff00ff", "#aa00ff", "#ff0088", "#00ffff", "#aa00ff", "#ff44aa"];

export default function Analytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://furniture-recommender-backend-2.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const countByKey = (arr, key) => {
    const counts = {};
    arr.forEach((item) => {
      const val = item[key] || "Unknown";
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const categoryData = countByKey(products, "categories");
  const brandData = countByKey(products, "brand");
  const colorData = countByKey(products, "color");

  const priceBins = [
    { range: "0-500", value: 0 },
    { range: "500-1000", value: 0 },
    { range: "1000-2000", value: 0 },
    { range: "2000-5000", value: 0 },
    { range: "5000+", value: 0 },
  ];

  products.forEach((item) => {
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      if (price <= 500) priceBins[0].value++;
      else if (price <= 1000) priceBins[1].value++;
      else if (price <= 2000) priceBins[2].value++;
      else if (price <= 5000) priceBins[3].value++;
      else priceBins[4].value++;
    }
  });

  const panelStyle = {
    bgcolor: "rgba(30,30,40,0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0,255,255,0.2)",
    borderRadius: 3,
    p: 2,
    overflow: "auto",
    textAlign: "center",
    height: "100%",
  };

  return (
    <Container sx={{ mt: 4, mb: 4, maxWidth: "xl" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#0ff", textShadow: "0 0 10px #0ff", mb: 3 }}
      >
        📊 Furniture Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Products per Category */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={panelStyle}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#ff00ff", textShadow: "0 0 5px #ff00ff" }}
            >
              Products per Category
            </Typography>
            <BarChart
              width={350}
              height={250}
              data={categoryData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#0ff" }} />
              <YAxis tick={{ fill: "#0ff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e28", borderColor: "#0ff" }} />
              <Bar dataKey="value" fill="#0ff" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Price Distribution */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={panelStyle}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#ff00ff", textShadow: "0 0 5px #ff00ff" }}
            >
              Price Distribution
            </Typography>
            <BarChart
              width={350}
              height={250}
              data={priceBins}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="range" tick={{ fontSize: 12, fill: "#0ff" }} />
              <YAxis tick={{ fill: "#0ff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e28", borderColor: "#0ff" }} />
              <Bar dataKey="value" fill="#ff00ff" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Brand Distribution */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={panelStyle}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#ff00ff", textShadow: "0 0 5px #ff00ff" }}
            >
              Brand Distribution
            </Typography>
            <PieChart width={350} height={250}>
              <Pie
                data={brandData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {brandData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "#0ff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e28", borderColor: "#0ff" }} />
            </PieChart>
          </Paper>
        </Grid>

        {/* Color Distribution */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={panelStyle}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#ff00ff", textShadow: "0 0 5px #ff00ff" }}
            >
              Color Distribution
            </Typography>
            <PieChart width={350} height={250}>
              <Pie
                data={colorData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {colorData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "#0ff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e28", borderColor: "#0ff" }} />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
