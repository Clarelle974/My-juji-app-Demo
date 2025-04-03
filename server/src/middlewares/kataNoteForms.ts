import type { RequestHandler } from "express";
import Joi from "joi";
import databaseClient from "../../database/client";
import type { Rows } from "../../database/client";

const noteSchema = Joi.object({
  id: Joi.number().optional(),
  kata_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'id de la technique doit être un nombre.",
    "number.integer": "L'id de la technique doit être un nombre.",
    "number.positive": "L'id de la technique doit être un nombre.",
    "any.required": "L'id de la technique doit être renseigné.",
  }),
  content: Joi.string().min(2).max(600).required().messages({
    "string.max": "Le contenu ne peut pas dépasser 600 caractères.",
    "string.min": "Le contenu ne peut contenir moins de 2 caractères.",
    "string.empty": "Le contenu est obligatoire.",
    "any.required": "Le contenu est obligatoire.",
  }),
});

const validate: RequestHandler = (req, res, next): void => {
  const { error } = noteSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors: Record<string, string> = {};

    for (const err of error.details) {
      errors[err.path[0] as string] = err.message;
    }

    res.status(400).json({ errors });
    return;
  }

  next();
};

export default { validate };
