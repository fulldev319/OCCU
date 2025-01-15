import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Data } from "../services/type";

interface DataCardProps {
  data: Data;
  onEdit: (data: Data) => void;
  onCopy: (data: Data) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const DataCard: React.FC<DataCardProps> = ({
  data,
  onEdit,
  onCopy,
  onDelete,
  isSelected,
  onSelect,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        textAlign: "center",
        borderRadius: "8px",
        transition: "transform 0.3s",
        backgroundColor: isSelected ? "#f0f8ff" : "inherit", // Highlight selected card
        border: isSelected ? "2px solid #1976d2" : "none", // Add border for selected
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography variant="h6">{data.name}</Typography>
      <Typography variant="body2">Field 1: {data.field1}</Typography>
      <Typography variant="body2">Field 2: {data.field2}</Typography>
      <Typography variant="body2">Field 3: {data.field3}</Typography>
      <Typography variant="caption">
        Updated: {new Date(data.timestamp).toLocaleString()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(data.id)} // Trigger selection on change
            />
          }
          label=""
          sx={{ mt: 1 }}
        />
        <Button size="small" onClick={() => onEdit(data)} sx={{ mt: 1 }}>
          Edit
        </Button>
        <Button size="small" onClick={() => onCopy(data)} sx={{ mt: 1 }}>
          Copy
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(data.id)}
          sx={{ mt: 1 }}
        >
          Delete
        </Button>
      </Box>
    </Paper>
  );
};

export default DataCard;
