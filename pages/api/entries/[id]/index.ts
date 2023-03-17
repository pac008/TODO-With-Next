import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/db";
import EntryModel from "@/models/Entry";
import { Entry } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | Entry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "el id no es válido " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntryById(req, res);
    default:
      res.status(400).json({ message: "metodo no existe" });
      break;
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await EntryModel.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "no existe usuario con ese id " + id });
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
} catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({message: 'bad request'});
  }
};


const getEntryById =async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entryToUpdate = await EntryModel.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "no existe usuario con ese id " + id });
    }
    await db.disconnect();
    res.status(200).json(entryToUpdate!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    res.status(400).json({message: 'bad request'}); 
  }
}