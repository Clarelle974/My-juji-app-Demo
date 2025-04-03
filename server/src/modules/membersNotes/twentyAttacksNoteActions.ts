import type { RequestHandler } from "express";

// // Import access to data
import twentyAttacksNoteRepository from "./twentyAttacksNoteRepository";
// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const twenty_attacksNotes = await twentyAttacksNoteRepository.readAll();
    res.json(twenty_attacksNotes);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
// const readByMemberAndKataId: RequestHandler = async (req, res, next) => {
//   try {
//     const kataId = Number(req.params.id);
//     const memberId = req.member.id;

//     const twenty_attacks_note = await twenty_attacksNoteRepository.readByMemberAndKataId(
//       kataId,
//       memberId,
//     );
//     if (twenty_attacks_note == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(twenty_attacks_note);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const browseByMember: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.member.id;

    const twenty_attacks_notes =
      await twentyAttacksNoteRepository.readByMember(memberId);
    if (twenty_attacks_notes == null) {
      res.sendStatus(404);
    } else {
      res.json(twenty_attacks_notes);
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

    const insertId = await twentyAttacksNoteRepository.create(newKodokanNote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const twenty_attacksNote = {
      id: Number(req.params.id),
      content: req.body.content,
      kata_id: req.body.kata_id,
    };
    const affectedRows =
      await twentyAttacksNoteRepository.update(twenty_attacksNote);

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

    await twentyAttacksNoteRepository.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, browseByMember, edit, add, destroy };
