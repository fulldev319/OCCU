import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { Data } from "./DataGrid";

interface DataFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Data>) => void;
  editingData: Data | null;
}

const DataForm: React.FC<DataFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingData,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      field1: formData.get("field1"),
      field2: formData.get("field2"),
      field3: formData.get("field3"),
    };
    onSubmit(data as Partial<Data>);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {editingData
          ? editingData.id === 0
            ? "Copy Data"
            : "Edit Data"
          : "Create Data"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            defaultValue={editingData?.name || ""}
            fullWidth
            required
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            name="field1"
            label="Field 1"
            defaultValue={editingData?.field1 || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="field2"
            label="Field 2"
            defaultValue={editingData?.field2 || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="field3"
            label="Field 3"
            defaultValue={editingData?.field3 || ""}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mt: 2,
            }}
            gap={2}
          >
            <Button type="submit" variant="contained" color="primary">
              {editingData && editingData.id === 0
                ? "Save Copy"
                : editingData
                ? "Update"
                : "Create"}
            </Button>
            <Button onClick={onClose} variant="contained" color="inherit">
              Close
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DataForm;
