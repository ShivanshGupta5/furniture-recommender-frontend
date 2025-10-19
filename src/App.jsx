import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Recommend from "./pages/Recommend";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Furniture Recommender
          </Typography>
          <Button color="inherit" component={Link} to="/">Recommend</Button>
          <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Recommend />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}
