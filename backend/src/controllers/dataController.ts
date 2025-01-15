import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Data } from "../models/data";

const filePath = path.join(__dirname, "../data/data.json");

const readData = (): Data[] => {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
};

const writeData = (data: Data[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const getAllData = (req: Request, res: Response) => {
  res.json(readData());
};

export const createData = (req: Request, res: Response) => {
  const data = readData();
  const newItem: Data = {
    ...req.body,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
};

export const updateData = (req: Request, res: Response) => {
  const data = readData();
  const index = data.findIndex((item) => item.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = {
      ...data[index],
      ...req.body,
      timestamp: new Date().toISOString(),
    };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
};

export const deleteData = (req: Request, res: Response) => {
  const data = readData();
  const filteredData = data.filter(
    (item) => item.id !== parseInt(req.params.id)
  );
  writeData(filteredData);
  res.status(204).send();
};
