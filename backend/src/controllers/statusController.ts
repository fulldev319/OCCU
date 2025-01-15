import { Request, Response } from "express";
import statuses from "../data/status.json";

export const getStatuses = (req: Request, res: Response) => {
  res.json(statuses);
};
