import type { RequestHandler } from "express";
import Joi from "joi";
import databaseClient from "../../database/client";
import type { Rows } from "../../database/client";

const techniqueSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.max": "Le nom de la technique ne peut pas dépasser 255 caractères.",
    "string.min":
      "Le nom de la technique ne peut pas être inférieur à 3 caractères.",
    "string.empty": "Le nom de la technique est obligatoire.",
    "any.required": "Le nom de la technique est obligatoire.",
  }),
  signification: Joi.string().min(3).max(255).required().messages({
    "string.max":
      "La traduction de la technique ne peut pas dépasser 255 caractères.",
    "string.min":
      "La traduction de la technique ne peut pas être inférieure à 3 caractères.",
    "string.empty": "La traduction est obligatoire.",
    "any.required": "La traduction est obligatoire.",
  }),
  description: Joi.string().allow("").optional(),
  category_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez sélectionner une catégorie de technique.",
    "number.integer": "Vous devez sélectionner une catégorie de technique.",
    "number.positive": "Vous devez sélectionner une catégorie de technique.",
    "any.required": "Vous devez sélectionner une catégorie de technique.",
  }),
  belt_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez sélectionner une ceinture.",
    "number.integer": "Vous devez sélectionner une ceinture.",
    "number.positive": "Vous devez sélectionner une ceinture.",
    "any.required": "Vous devez sélectionner une ceinture.",
  }),
});

const validate: RequestHandler = (req, res, next): void => {
  const { error } = techniqueSchema.validate(req.body, { abortEarly: false });

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

const verifyUniqueName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;

    const rows = await databaseClient.query<Rows>(
      "SELECT id FROM technique WHERE name = ?",
      [name],
    );
    console.info("rows", rows[0]);
    // Vérification si le nom existe déjà dans la base de données
    if (rows[0].length > 0) {
      res.status(400).json({ errors: { name: "Ce nom est déjà utilisé." } });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default { validate, verifyUniqueName };
