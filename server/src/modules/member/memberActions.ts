import type { RequestHandler } from "express";

import memberRepository from "./memberRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const members = await memberRepository.readAll();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.member.id;
    const member = await memberRepository.read(memberId);
    if (member == null) {
      res.sendStatus(404);
    } else {
      res.json(member);
    }
  } catch (err) {
    next(err);
  }
};

const editBeltId: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      id: req.member.id,
      belt_id: req.body.belt_id,
    };
    const affectedRows = await memberRepository.updateBeltId(member);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (err) {
    next(err);
  }
};

const editEmail: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      id: req.member.id,
      email: req.body.email,
    };
    const affectedRows = await memberRepository.updateEmail(member);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (err) {
    next(err);
  }
};
const editName: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      id: req.member.id,
      name: req.body.name,
    };
    const affectedRows = await memberRepository.updateName(member);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (err) {
    next(err);
  }
};
const editPassword: RequestHandler = async (req, res, next) => {
  try {
    const member = {
      id: req.member.id,
      hashed_password: req.body.hashed_password,
    };
    const affectedRows = await memberRepository.updatePassword(member);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (err) {
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const insertId = await memberRepository.create(req.body);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  editBeltId,
  editEmail,
  editName,
  editPassword,
  add,
};
