import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

// Adjust this to your backend API
const API_BASE = "http://localhost:5000/api";

// Type for a single Task
export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt?: string;
}

// Props type for the dialog
interface TaskDialogProps {
  open: boolean;
  handleClose: () => void;
  editing: Task | null;
}

export const TaskDialog = ({open, handleClose, editing }: TaskDialogProps) => {
  const isEdit = Boolean(editing);
  const [title, setTitle] = useState(editing?.title || "");
  const [description, setDescription] = useState(editing?.description || "");
  const [status, setStatus] = useState<Task["status"]>(
    editing?.status || "Pending"
  );

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setStatus(editing.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [editing, open]);

  const submit = async () => {
    try {
      if (isEdit) {
        await axios.put(`${API_BASE}/tasks/${editing?._id}`, {
          title,
          description,
          status,
        });
      } else {
        await axios.post(`${API_BASE}/tasks`, {
          title,
          description,
          status,
        });
      }
      handleClose();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mt: 1 }}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={{ mt: 2 }}
          required
        />
        <TextField
          select
          SelectProps={{ native: true }}
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          fullWidth
          sx={{ mt: 2 }}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          {isEdit ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
