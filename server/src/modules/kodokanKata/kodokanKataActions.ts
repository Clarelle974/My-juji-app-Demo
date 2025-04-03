import type { RequestHandler } from "express";

// // Import access to data
import kodokanKataRepository from "./kodokanKataRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const katas = await kodokanKataRepository.readAll();
    res.json(katas);
  } catch (err) {
    next(err);
  }
};

const browseByBelt: RequestHandler = async (req, res, next) => {
  try {
    let rank_order_query = req.query.rank_order as string | string[];

    if (!rank_order_query) {
      rank_order_query = "1,2,3,4,5,6";
    }
    const katas = await kodokanKataRepository.readByBelt(rank_order_query);
    res.json(katas);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const kataId = Number(req.params.id);
    const kata = await kodokanKataRepository.read(kataId);
    if (kata == null) {
      res.sendStatus(404);
    } else {
      res.json(kata);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newKata = {
      rank_order: req.body.rank_order,
      defense: req.body.defense,
      technique_id: req.body.technique_id,
      belt_id: req.body.belt_id,
    };

    const insertId = await kodokanKataRepository.create(newKata);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const kata = {
      id: Number(req.params.id),
      rank_order: req.body.rank_order,
      defense: req.body.defense,
      technique_id: req.body.technique_id,
      belt_id: req.body.belt_id,
    };
    const affectedRows = await kodokanKataRepository.update(kata);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json({
        message: "Modification réussie",
        id: kata.id,
      });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const techniqueId = Number(req.params.id);

    await kodokanKataRepository.delete(techniqueId);

    res.sendStatus(204); //mettre 200 avec message si on veut spécifier le message
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseByBelt,
  read,
  add,
  edit,
  destroy,
};
