import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { fetchStatuses } from "../services/api";

interface Status {
  id: number;
  status: "pass" | "warn" | "fail";
}

const StatusGrid: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    const getStatuses = async () => {
      const data = await fetchStatuses();
      setStatuses(data);
    };
    getStatuses();
  }, []);

  // Map statuses to color
  const getStatusColor = (status: "pass" | "warn" | "fail") => {
    switch (status) {
      case "pass":
        return "#4CAF50"; // Green
      case "warn":
        return "#FFC107"; // Yellow
      case "fail":
        return "#F44336"; // Red
      default:
        return "#E0E0E0"; // Default grey
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Status Overview
      </Typography>
      <Grid container spacing={3}>
        {statuses.map((status) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={status.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                backgroundColor: getStatusColor(status.status),
                color: "#fff",
                textAlign: "center",
                borderRadius: "8px",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="h6">ID: {status.id}</Typography>
              <Typography variant="subtitle1">
                Status: {status.status.toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatusGrid;
