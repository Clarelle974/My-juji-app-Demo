import type { RequestHandler } from "express";

// // Import access to data
import techniqueNoteRepository from "./techniqueNoteRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const techniqueNotes = await techniqueNoteRepository.readAll();
    res.json(techniqueNotes);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const readByMemberAndTechniqueId: RequestHandler = async (req, res, next) => {
  try {
    const techniqueId = Number(req.params.id);
    const memberId = req.member.id;

    const technique_note =
      await techniqueNoteRepository.readByMemberAndTechniqueId(
        techniqueId,
        memberId,
      );
    if (technique_note == null) {
      res.sendStatus(404);
    } else {
      res.json(technique_note);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newTechniqueNote = {
      member_id: req.member.id,
      technique_id: req.body.technique_id,
      content: req.body.content,
    };

    const insertId = await techniqueNoteRepository.create(newTechniqueNote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const techniqueNote = {
      id: Number(req.params.id),
      content: req.body.content,
      technique_id: req.body.technique_id,
    };
    const affectedRows = await techniqueNoteRepository.update(techniqueNote);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await techniqueNoteRepository.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, readByMemberAndTechniqueId, edit, add, destroy };
