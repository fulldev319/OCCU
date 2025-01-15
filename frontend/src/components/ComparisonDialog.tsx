import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Data } from "../services/type";

interface ComparisonDialogProps {
  open: boolean;
  onClose: () => void;
  comparisonData: [Data, Data] | null;
}

const ComparisonDialog: React.FC<ComparisonDialogProps> = ({
  open,
  onClose,
  comparisonData,
}) => {
  if (!comparisonData) return null;

  const [item1, item2] = comparisonData;

  // Fields to compare
  const fieldsToCompare = ["field1", "field2", "field3"];

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Comparison Results</DialogTitle>
      <DialogContent>
        <Box>
          {fieldsToCompare.map((field) => (
            <Box key={field} mb={2}>
              <Typography>
                <strong>{field.replace("field", "Field ")}:</strong>{" "}
                {item1[field as keyof Data] === item2[field as keyof Data] ? (
                  <span>{item1[field as keyof Data]}</span>
                ) : (
                  <span style={{ color: "red" }}>
                    {item1[field as keyof Data]} vs {item2[field as keyof Data]}
                  </span>
                )}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComparisonDialog;
