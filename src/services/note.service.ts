

import Note from "../models/Note.js";

export const getNotesService = async (userId: string, search?: string, filter?: string) => {
  const query: any = {
    $or: [{ owner: userId }, { collaborators: userId }],
  };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (filter && filter !== 'all') {
    query.tag = filter;
  }

  return await Note.find(query);
};

export const createNoteService = async (userId: string, title: string, content: string, tag?: string, collaborators?: string[]) => {
  return await Note.create({
    title,
    content,
    tag,
    collaborators,
    owner: userId,
  });
};

export const updateNoteService = async (noteId: string, updateData: any) => {
  return await Note.findOneAndUpdate({ _id: noteId }, updateData, { new: true });
};

export const deleteNoteService = async (noteId: string, userId: string) => {
  return await Note.findOneAndDelete({ _id: noteId, owner: userId });
};

export const getNoteByIdService = async (noteId: string, userId: string) => {
  return await Note.findOne({
    _id: noteId,
    $or: [{ owner: userId }, { collaborators: { $in: [userId] } }],
  });
};
