import type { RequestHandler } from "express";

import Joi from "joi";

const kodokanKataSchema = Joi.object({
  rank_order: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez entrer un nombre.",
    "number.integer": "Vous devez entrer un nombre.",
    "number.positive": "Vous devez entrer un nombre.",
    "any.required": "Vous devez entrer un nombre.",
  }),
  defense: Joi.string().min(3).max(600).required().messages({
    "string.max": "Les détails ne peuvent pas dépasser 600 caractères.",
    "string.min": "Les détails ne peuvent pas être inférieurs à 3 caractères.",
    "string.empty": "Les détails sont obligatoires.",
    "any.required": "Les détails sont obligatoires.",
  }),
  technique_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez sélectionner une technique.",
    "number.integer": "Vous devez sélectionner une technique.",
    "number.positive": "Vous devez sélectionner une technique.",
    "any.required": "Vous devez sélectionner une technique.",
  }),
  belt_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez sélectionner une ceinture.",
    "number.integer": "Vous devez sélectionner une ceinture.",
    "number.positive": "Vous devez sélectionner une ceinture.",
    "any.required": "Vous devez sélectionner une ceinture.",
  }),
});

const validate: RequestHandler = (req, res, next): void => {
  const { error } = kodokanKataSchema.validate(req.body, { abortEarly: false });

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
