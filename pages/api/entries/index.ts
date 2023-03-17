import { db } from "@/db";
import EntryModel from "@/models/Entry";
import type { NextApiRequest, NextApiResponse } from "next";
import { Entry } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  |  Entry[]
  |  Entry ;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);
    default:
      return res.status(400).json({ message: "Endpoint inexistente" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json( entries );
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;
  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  });
  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res.status(500).json({ message: "Algo salió mal" });
  }
};
