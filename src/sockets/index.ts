import { Server } from "socket.io";
import Note from "../models/Note.js";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-note", (noteId) => {
      socket.join(noteId);
      console.log(`User ${socket.id} joined note: ${noteId}`);

      socket.to(noteId).emit("user-joined", {
        userId: socket.id,
        noteId,
      });
    });

    socket.on("leave-note", (noteId) => {
      socket.leave(noteId);
      console.log(`User ${socket.id} left note: ${noteId}`);

      socket.to(noteId).emit("user-left", {
        userId: socket.id,
        noteId,
      });
    });

    socket.on("create-note", async ({ title, content, tag, collaborators }) => {
      try {
        const newNote = await Note.create({
          title,
          content,
          tag,
          collaborators,
        });

        io.emit("note-created", newNote);

        socket.emit("note-saved", {
          noteId: newNote._id,
          success: true,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        socket.emit("note-save-error", {
          error: (error as any)?.message || "Error creating note",
        });
      }
    });

    socket.on("edit-note", async ({ noteId, content, title, tag }) => {
      try {
        const updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { content, title, tag },
          { new: true }
        );

        if (updatedNote) {
          io.to(noteId).emit("note-updated", updatedNote);
        }

        socket.emit("note-saved", {
          noteId,
          success: true,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        socket.emit("note-save-error", {
          noteId,
          error: (error as any)?.message || "Update error",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
