import type { RequestHandler } from "express";
import Joi from "joi";
import databaseClient from "../../database/client";
import type { Rows } from "../../database/client";

const memberSchema = Joi.object({
  name: Joi.string().min(3).max(25).required().messages({
    "string.max": "Le nom ne peut pas dépasser 25 caractères.",
    "string.min": "Le nom ne peut pas être inférieur à 3 caractères.",
    "string.empty": "Le nom est obligatoire.",
    "any.required": "Le nom est obligatoire.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(100)
    .required()
    .messages({
      "string.email": "L'email doit être valide.",
      "string.min": "L'email doit contenir au moins 5 caractères.",
      "string.max": "L'email ne peut pas dépasser 100 caractères.",
      "string.empty": "L'email est obligatoire.",
      "any.required": "L'email est obligatoire.",
    }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.max": "Le mot de passe ne peut pas dépasser 50 caractères.",
    "string.min": "Le mot de passe ne peut contenir moins de 8 caractères.",
    "string.empty": "Le mot de passe est obligatoire.",
    "any.required": "Le mot de passe est obligatoire.",
  }),
  //   password: Joi.string()
  //   .min(8) // Minimum 8 caractères
  //   .max(64) // Maximum 64 caractères
  //   .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"))
  //   .required()
  //   .messages({
  //     "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
  //     "string.max": "Le mot de passe ne peut pas dépasser 64 caractères.",
  //     "string.empty": "Le mot de passe est obligatoire.",
  //     "any.required": "Le mot de passe est obligatoire.",
  //     "string.pattern.base":
  //       "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial (@$!%*?&).",
  //   }),
  belt_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vous devez sélectionner une ceinture.",
    "number.integer": "Vous devez sélectionner une ceinture.",
    "number.positive": "Vous devez sélectionner une ceinture.",
    "any.required": "Vous devez sélectionner une ceinture.",
  }),
});

const beltIdSchema = Joi.object({
  belt_id: memberSchema.extract("belt_id"),
});
const emailSchema = Joi.object({
  email: memberSchema.extract("email"),
});
const nameSchema = Joi.object({
  name: memberSchema.extract("name"),
});
const passwordSchema = Joi.object({
  password: memberSchema.extract("password"),
});

const validate: RequestHandler = (req, res, next): void => {
  const { error } = memberSchema.validate(req.body, { abortEarly: false });

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

const validateBeltId: RequestHandler = (req, res, next) => {
  const { error } = beltIdSchema.validate(req.body, { abortEarly: false });

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

const validateEmail: RequestHandler = (req, res, next) => {
  const { error } = emailSchema.validate(req.body, { abortEarly: false });

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

const validateName: RequestHandler = (req, res, next) => {
  const { error } = nameSchema.validate(req.body, { abortEarly: false });

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
const validatePassword: RequestHandler = (req, res, next) => {
  const { error } = passwordSchema.validate(req.body, { abortEarly: false });

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

const verifyUniqueEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.body.email;
    const rows = await databaseClient.query<Rows>(
      "SELECT id FROM member WHERE email = ?",
      [email],
    );
    if (rows[0].length > 0) {
      res.status(400).json({ errors: { name: "Cet email est déjà utilisé." } });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  validate,
  validateBeltId,
  validateEmail,
  validateName,
  validatePassword,
  verifyUniqueEmail,
};
