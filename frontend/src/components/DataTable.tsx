import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { fetchAllData, deleteData } from "../services/api";

export interface Data {
  id: number;
  name: string;
  field1: string;
  field2: string;
  field3: string;
  timestamp: string;
}

const DataTable: React.FC<{ onEdit: (data: Data) => void }> = ({ onEdit }) => {
  const [dataList, setDataList] = useState<Data[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllData();
      setDataList(data);
    };
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteData(id);
    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Field 1</TableCell>
            <TableCell>Field 2</TableCell>
            <TableCell>Field 3</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.field1}</TableCell>
              <TableCell>{data.field2}</TableCell>
              <TableCell>{data.field3}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(data)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(data.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
