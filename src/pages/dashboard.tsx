import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskDialog } from "../components/taskDialog";
import { useAuth } from "../context/authContext";

  // 🧩 Dummy data
  const allTasks = [
    { _id: "1", title: "Task 1", description: "Desc 1", status: "Pending", createdAt: new Date() },
    { _id: "2", title: "Task 2", description: "Desc 2", status: "Done", createdAt: new Date() },
    { _id: "3", title: "Task 3", description: "Desc 3", status: "Pending", createdAt: new Date() },
    { _id: "4", title: "Task 4", description: "Desc 4", status: "Pending", createdAt: new Date() },
    { _id: "5", title: "Task 5", description: "Desc 5", status: "Pending", createdAt: new Date() },
    { _id: "6", title: "Task 6", description: "Desc 6", status: "Done", createdAt: new Date() },
    { _id: "7", title: "Task 7", description: "Desc 7", status: "Pending", createdAt: new Date() },
    { _id: "8", title: "Task 8", description: "Desc 8", status: "Pending", createdAt: new Date() },
    { _id: "9", title: "Task 9", description: "Desc 9", status: "Pending", createdAt: new Date() },
    { _id: "10", title: "Task 10", description: "Desc 10", status: "Pending", createdAt: new Date() },
  ];


export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const pageSize = 5; // 🧾 5 tasks per page

  // 🧠 Simulated pagination
  const fetchTasks = (pageNum = 1) => {
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = allTasks.slice(startIndex, endIndex);

    setTasks(paginatedTasks);
    setTotalPages(Math.ceil(allTasks.length / pageSize));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    alert(`Task with id ${id} deleted (simulation only)`);
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  return (
    <Box sx={{ padding: "20px", height: "85%", width: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          Add Task
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ p: 2, flexGrow: 1, height: "90%", overflow : "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((t) => (
                <TableRow key={t._id} hover>
                  <TableCell>{t.title}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditing(t);
                        setDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {user?.role === "admin" && (
                      <IconButton onClick={() => handleDelete(t._id)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>

      <TaskDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          fetchTasks(page);
        }}
        editing={editing}
      />
    </Box>
  );
}
