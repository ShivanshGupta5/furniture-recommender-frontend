// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import Layout from "../components/Layout";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#5DADE2", "#52BE80", "#F5B041", "#DC7633", "#E74C3C"];

export default function Analytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const countByKey = (arr, key) => {
    const counts = {};
    arr.forEach((item) => {
      const value = item[key] || "Unknown";
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const categoryData = countByKey(products, "categories");
  const brandData = countByKey(products, "brand");
  const colorData = countByKey(products, "color");

  const priceBins = [
    { range: "0-500", count: 0 },
    { range: "500-1000", count: 0 },
    { range: "1000-2000", count: 0 },
    { range: "2000-5000", count: 0 },
    { range: "5000+", count: 0 },
  ];
  products.forEach((item) => {
    const price = parseFloat(item.price);
    if (!isNaN(price)) {
      if (price <= 500) priceBins[0].count += 1;
      else if (price <= 1000) priceBins[1].count += 1;
      else if (price <= 2000) priceBins[2].count += 1;
      else if (price <= 5000) priceBins[3].count += 1;
      else priceBins[4].count += 1;
    }
  });

  return (
    <Layout>
      <Typography variant="h4" sx={{ mt: 4, mb: 4, textAlign: "center" }}>📊 Furniture Analytics Dashboard</Typography>
      <Grid container spacing={4} sx={{ px: 3 }}>
        {/* Products per Category */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Products per Category</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Price Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Price Distribution</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={priceBins}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Brand Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Brand Distribution</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={brandData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {brandData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Color Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Color Distribution</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={colorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {colorData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
