import { isValidObjectId } from "mongoose";
import { db } from ".";
import EntryModel from "@/models/Entry";
import { Entry } from "../interfaces/entry";

export const getEntryById = async (id: string): Promise<Entry | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  await db.connect();
  const entry = await EntryModel.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(entry));
};
