import type { RequestHandler } from "express";

import Joi from "joi";

const twentyAttacksKataSchema = Joi.object({
  rank_order: Joi.string().min(2).max(3).required().messages({
    "string.max": "Le rang ne peut pas dépasser 3 caractères. Exemple : A10",
    "string.min":
      "Le rang ne peut pas être inférieur à 2 caractères.Exemple : B2",
    "string.empty": "Le rang est obligatoire.",
    "any.required": "Le rang est obligatoire.",
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
  const { error } = twentyAttacksKataSchema.validate(req.body, {
    abortEarly: false,
  });

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
