import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  fetchAllData,
  deleteData,
  createData,
  updateData,
} from "../services/api";

export interface Data {
  id: number;
  name: string;
  field1: string;
  field2: string;
  field3: string;
  timestamp: string;
}

const DataGrid: React.FC = () => {
  const [dataList, setDataList] = useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Data | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllData();
      setDataList(data);
    };
    getData();
  }, []);

  // Handle opening the dialog for create/edit/copy
  const handleDialogOpen = (data?: Data, isCopy?: boolean) => {
    if (isCopy && data) {
      // Open dialog for copying data, ensure all fields are non-undefined
      setEditingData({
        id: 0,
        name: `${data.name} (Copy)`,
        field1: data.field1 || "",
        field2: data.field2 || "",
        field3: data.field3 || "",
        timestamp: new Date().toISOString(), // Set the current timestamp for the copy
      });
    } else {
      // Open dialog for creating or editing data
      setEditingData(data || null);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingData(null);
  };

  // Handle form submission
  const handleFormSubmit = async (formData: Partial<Data>) => {
    if (editingData && editingData.id !== 0) {
      // Update existing data
      const updatedData = await updateData(editingData.id, formData);
      setDataList((prev) =>
        prev.map((item) => (item.id === editingData.id ? updatedData : item))
      );
    } else {
      // Create new data
      const newData = await createData(formData);
      setDataList((prev) => [...prev, newData]);
    }
    handleDialogClose();
  };

  // Handle delete action
  const handleDelete = async (id: number) => {
    await deleteData(id);
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter data based on search query
  const filteredData = dataList.filter(
    (data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.field1.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom align="center">
        Data Management
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        gap={2}
        marginBottom={2}
      >
        {/* Search Bar */}
        <TextField
          label="Search Data"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: "8px" }}
        />

        {/* Create Data Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen()}
          sx={{ minWidth: "200px", minHeight: "56px" }}
        >
          Create Data
        </Button>
      </Box>

      {/* Data Grid */}
      <Grid container spacing={3}>
        {filteredData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: "8px",
                transition: "transform 0.3s",
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
                <Button
                  size="small"
                  onClick={() => handleDialogOpen(data)}
                  sx={{ mt: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDialogOpen(data, true)} // Open dialog for copying
                  sx={{ mt: 1, ml: 1 }}
                >
                  Copy
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(data.id)}
                  sx={{ mt: 1, ml: 1 }}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Data Form Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>
          {editingData
            ? editingData.id === 0
              ? "Copy Data"
              : "Edit Data"
            : "Create Data"}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                name: formData.get("name"),
                field1: formData.get("field1"),
                field2: formData.get("field2"),
                field3: formData.get("field3"),
              };
              handleFormSubmit(data as Partial<Data>);
            }}
          >
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
              <Button
                onClick={handleDialogClose}
                variant="contained"
                color="inherit"
              >
                Close
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DataGrid;
