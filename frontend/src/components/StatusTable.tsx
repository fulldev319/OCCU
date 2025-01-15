import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { fetchStatuses } from "../services/api";

interface Status {
  id: number;
  status: "pass" | "warn" | "fail";
}

const StatusTable: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    const getStatuses = async () => {
      const data = await fetchStatuses();
      setStatuses(data);
    };
    getStatuses();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>
        Status List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statuses.map((status) => (
            <TableRow key={status.id}>
              <TableCell>{status.id}</TableCell>
              <TableCell
                style={{
                  color:
                    status.status === "pass"
                      ? "green"
                      : status.status === "warn"
                      ? "orange"
                      : "red",
                }}
              >
                {status.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatusTable;
