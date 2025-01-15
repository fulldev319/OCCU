import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { createData, updateData } from "../services/api";

interface DataFormProps {
  data?: any;
  onSubmit: () => void;
}

const DataForm: React.FC<DataFormProps> = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState(
    data || { name: "", field1: "", field2: "", field3: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data) {
      await updateData(data.id, formData);
    } else {
      await createData(formData);
    }
    onSubmit();
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="field1"
          label="Field 1"
          value={formData.field1}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="field2"
          label="Field 2"
          value={formData.field2}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="field3"
          label="Field 3"
          value={formData.field3}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit">Submit</Button>
      </form>
    </Paper>
  );
};

export default DataForm;
