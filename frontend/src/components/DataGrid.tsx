import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  fetchAllData,
  deleteData,
  createData,
  updateData,
} from "../services/api";
import DataCard from "./DataCard";
import DataForm from "./DataForm";
import ComparisonDialog from "./ComparisonDialog";
import { Data } from "../services/type";

const DataGrid: React.FC = () => {
  const [dataList, setDataList] = useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<Data | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [comparisonData, setComparisonData] = useState<[Data, Data] | null>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllData();
      setDataList(data);
    };
    getData();
  }, []);

  const handleDialogOpen = (data?: Data, isCopy?: boolean) => {
    if (isCopy && data) {
      setEditingData({
        id: 0,
        name: `${data.name} (Copy)`,
        field1: data.field1 || "",
        field2: data.field2 || "",
        field3: data.field3 || "",
        timestamp: new Date().toISOString(),
      });
    } else {
      setEditingData(data || null);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingData(null);
  };

  const handleFormSubmit = async (formData: Partial<Data>) => {
    if (editingData && editingData.id !== 0) {
      const updatedData = await updateData(editingData.id, formData);
      setDataList((prev) =>
        prev.map((item) => (item.id === editingData.id ? updatedData : item))
      );
    } else {
      const newData = await createData(formData);
      setDataList((prev) => [...prev, newData]);
    }
    handleDialogClose();
  };

  const handleDelete = async (id: number) => {
    await deleteData(id);
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedIds.length === 2) {
      const [first, second] = selectedIds.map((id) =>
        dataList.find((item) => item.id === id)
      );
      if (first && second) {
        setComparisonData([first, second]);
      }
    }
  };

  const handleComparisonClose = () => {
    setComparisonData(null);
    setSelectedIds([]);
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen()}
          sx={{ minWidth: "200px", minHeight: "56px" }}
        >
          Create Data
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCompare}
          disabled={selectedIds.length !== 2}
          sx={{ minWidth: "200px", minHeight: "56px" }}
        >
          Compare Selected
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
            <DataCard
              data={data}
              onEdit={(data) => handleDialogOpen(data)}
              onCopy={(data) => handleDialogOpen(data, true)}
              onDelete={handleDelete}
              isSelected={selectedIds.includes(data.id)}
              onSelect={handleSelect}
            />
          </Grid>
        ))}
      </Grid>
      <DataForm
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        editingData={editingData}
      />
      <ComparisonDialog
        open={!!comparisonData}
        onClose={handleComparisonClose}
        comparisonData={comparisonData}
      />
    </Box>
  );
};

export default DataGrid;
