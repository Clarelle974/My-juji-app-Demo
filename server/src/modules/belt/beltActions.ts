import type { RequestHandler } from "express";

// // Import access to data
import beltRepository from "./beltRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const belts = await beltRepository.readAll();
    res.json(belts);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
