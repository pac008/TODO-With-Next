import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { seedData } from "@/db/seed-data";
import EntryModel from "@/models/Entry";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso" });
  }

  await db.connect();

  await EntryModel.deleteMany();
  await EntryModel.insertMany(seedData.entries);

  await db.disconnect();
  res.status(200).json({ message: "todo bien" });
}
