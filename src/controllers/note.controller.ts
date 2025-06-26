import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";
import sendResponse from "../utils/sendResponse.js";
import { CustomError } from "../utils/customError.js";
import {
  getNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
  getNoteByIdService,
} from "../services/note.service.js";

export const getNotes = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search, filter } = req.query;
    const userId = req.user?._id;
    const notes = await getNotesService(
      userId?.userId,
      search as string,
      filter as string
    );
    sendResponse(res, 200, notes);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const createNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, tag, collaborators } = req.body;

    if (!title || !content) {
      return next(new CustomError("Title and content are required", 400));
    }

    const userId: any = req.user?._id;

    const note = await createNoteService(
      userId?.userId,
      title,
      content,
      tag,
      collaborators
    );


    const io = req.app.get("io");
    io.emit("note-created", note); 

    sendResponse(res, 201, note);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const updateNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const note = await updateNoteService(id, updateData);

    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    const io = req.app.get("io");
    io.emit("note-updated", note);

    sendResponse(res, 200, note);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const deleteNote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId: any = req.user?._id;
    const note = await deleteNoteService(id, userId?.userId);

    if (!note) {
      return next(
        new CustomError("Only the author is allowed to delete this note.", 403)
      );
    }

    sendResponse(res, 200, { message: "Note deleted" });
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const getNoteById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId: any = req.user?._id;
    const note = await getNoteByIdService(id, userId?.userId);

    if (!note) {
      return next(new CustomError("Note not found", 404));
    }

    sendResponse(res, 200, note);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};
