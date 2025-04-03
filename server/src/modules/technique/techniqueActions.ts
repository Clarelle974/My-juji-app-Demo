import type { RequestHandler } from "express";

// // Import access to data
import techniqueRepository from "./techniqueRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const techniques = await techniqueRepository.readAll();
    res.json(techniques);
  } catch (err) {
    next(err);
  }
};
const browseSearchedTechniques: RequestHandler = async (req, res, next) => {
  try {
    const searchedTechnique = req.params.searchedTechnique;
    const techniques =
      await techniqueRepository.readAllSearchedTechniques(searchedTechnique);
    res.json(techniques);
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
    const techniques = await techniqueRepository.readByBelt(rank_order_query);
    res.json(techniques);
  } catch (err) {
    next(err);
  }
};

const browseByCategoryAndBelt: RequestHandler = async (req, res, next) => {
  try {
    const category_slug = req.params.slug;
    let rank_order_query = req.query.rank_order as string | string[];

    if (!rank_order_query) {
      rank_order_query = "1,2,3,4,5,6";
    }
    const techniques = await techniqueRepository.readByCategoryAndBelt(
      category_slug,
      rank_order_query,
    );
    res.json(techniques);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const techniqueId = Number(req.params.id);
    const technique = await techniqueRepository.read(techniqueId);
    if (technique == null) {
      res.sendStatus(404);
    } else {
      res.json(technique);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newTechnique = {
      name: req.body.name,
      signification: req.body.signification,
      description: req.body.description,
      category_id: req.body.category_id,
      belt_id: req.body.belt_id,
    };

    const insertId = await techniqueRepository.create(newTechnique);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const technique = {
      id: Number(req.params.id),
      name: req.body.name,
      signification: req.body.signification,
      description: req.body.description,
      category_id: req.body.category_id,
      belt_id: req.body.belt_id,
    };
    const affectedRows = await techniqueRepository.update(technique);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json({
        message: "Mise à jour réussie",
        id: technique.id,
      });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const techniqueId = Number(req.params.id);

    await techniqueRepository.delete(techniqueId);

    res.sendStatus(204); //mettre 200 avec message si on veut spécifier le message
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseSearchedTechniques,
  browseByBelt,
  browseByCategoryAndBelt,
  read,
  add,
  edit,
  destroy,
};
