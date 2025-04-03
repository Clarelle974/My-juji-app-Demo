import type { RequestHandler } from "express";

// // Import access to data
import kodokanNoteRepository from "./kodokanNoteRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const kodokanNotes = await kodokanNoteRepository.readAll();
    res.json(kodokanNotes);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
// const readByMemberAndKataId: RequestHandler = async (req, res, next) => {
//   try {
//     const kataId = Number(req.params.id);
//     const memberId = req.member.id;

//     const kodokan_note = await kodokanNoteRepository.readByMemberAndKataId(
//       kataId,
//       memberId,
//     );
//     if (kodokan_note == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(kodokan_note);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const browseByMember: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.member.id;

    const kodokan_notes = await kodokanNoteRepository.readByMember(memberId);
    if (kodokan_notes == null) {
      res.sendStatus(404);
    } else {
      res.json(kodokan_notes);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newKodokanNote = {
      member_id: req.member.id,
      kata_id: req.body.kata_id,
      content: req.body.content,
    };

    const insertId = await kodokanNoteRepository.create(newKodokanNote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const kodokanNote = {
      id: Number(req.params.id),
      content: req.body.content,
      kata_id: req.body.kata_id,
    };
    const affectedRows = await kodokanNoteRepository.update(kodokanNote);

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

    await kodokanNoteRepository.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseByMember, edit, add, destroy };
