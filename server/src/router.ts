import express from "express";

const router = express.Router();

/* CONTROLLERS ************************************************************************* */
import authActions from "./middlewares/authActions";
import beltActions from "./modules/belt/beltActions";
import categoryActions from "./modules/category/categoryActions";
import kodokanKataActions from "./modules/kodokanKata/kodokanKataActions";
import memberActions from "./modules/member/memberActions";
import kodokanNoteActions from "./modules/membersNotes/kodokanNoteActions";
import techniqueNoteActions from "./modules/membersNotes/techniqueNoteActions";
import twentyAttacksNoteActions from "./modules/membersNotes/twentyAttacksNoteActions";
import techniqueActions from "./modules/technique/techniqueActions";
import twentyAttacksKataActions from "./modules/twentyAttacksKata/twentyAttacksKataActions";

/* CHECKS FROM MIDDLEWARES ******************************************************************* */

import kataNoteForms from "./middlewares/kataNoteForms";
import kodokanKataForms from "./middlewares/kodokanKataForms";
import memberForms from "./middlewares/memberForms";
import noteForms from "./middlewares/noteForms";
import techniqueForms from "./middlewares/techniqueForms";
import twentyAttacksKataForms from "./middlewares/twentyAttacksKataForms";

/* MEMBERS ************************************************************************* */

//besoin de verifier auth ou login ?
router.get("/api/members", authActions.verify, memberActions.browse);
router.get("/api/members/profile", authActions.verify, memberActions.read);
router.post(
  "/api/members",
  memberForms.validate,
  memberForms.verifyUniqueEmail,
  authActions.hashPassword,
  memberActions.add,
);
router.put(
  "/api/members/belt_id",
  authActions.verify,
  memberForms.validateBeltId,
  memberActions.editBeltId,
);
router.put(
  "/api/members/email",
  authActions.verify,
  memberForms.validateEmail,
  memberForms.verifyUniqueEmail,
  memberActions.editEmail,
);
router.put(
  "/api/members/name",
  authActions.verify,
  memberForms.validateName,
  memberActions.editName,
);
router.put(
  "/api/members/password",
  authActions.verify,
  memberForms.validatePassword,
  authActions.hashPassword,
  memberActions.editPassword,
);

/* LOGIN / LOGOUT ************************************************************************* */
router.post("/api/login", authActions.login);
router.get("/api/logout", authActions.logout);

/* TECHNIQUES ************************************************************************* */

router.get("/api/techniques", techniqueActions.browse);
router.get(
  "/api/techniques/category/:slug",
  techniqueActions.browseByCategoryAndBelt,
);

router.get(
  "/api/techniques/search/:searchedTechnique",
  techniqueActions.browseSearchedTechniques,
);

router.get("/api/techniques/belts/", techniqueActions.browseByBelt);

router.get("/api/techniques/:id", techniqueActions.read);

/**************** */
router.post(
  "/api/techniques",
  authActions.verify,
  authActions.checkIfAdmin,
  techniqueForms.verifyUniqueName,
  techniqueForms.validate,
  techniqueActions.add,
);
router.put(
  "/api/techniques/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  techniqueForms.validate,
  techniqueActions.edit,
);
router.delete(
  "/api/techniques/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  techniqueActions.destroy,
);

/* KATAS ************************************************************************* */
// router.get("/api/kodokan-katas", kodokanKataActions.browse);
router.get("/api/kodokan-katas/belts/", kodokanKataActions.browseByBelt);
router.get("/api/kodokan-katas/:id", kodokanKataActions.read);
router.post(
  "/api/kodokan-katas",
  authActions.verify,
  authActions.checkIfAdmin,
  kodokanKataForms.validate,
  kodokanKataActions.add,
);
router.put(
  "/api/kodokan-katas/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  kodokanKataForms.validate,
  kodokanKataActions.edit,
);
router.delete(
  "/api/kodokan-katas/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  kodokanKataActions.destroy,
);

// router.get("/api/twenty-attacks-katas", twentyAttacksKataActions.browse);
router.get(
  "/api/twenty-attacks-katas/belts/",
  twentyAttacksKataActions.browseByBelt,
);
router.get("/api/twenty-attacks-katas/:id", twentyAttacksKataActions.read);
router.post(
  "/api/twenty-attacks-katas",
  authActions.verify,
  authActions.checkIfAdmin,
  twentyAttacksKataForms.validate,
  twentyAttacksKataActions.add,
);
router.put(
  "/api/twenty-attacks-katas/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  twentyAttacksKataForms.validate,
  twentyAttacksKataActions.edit,
);
router.delete(
  "/api/twenty-attacks-katas/:id",
  authActions.verify,
  authActions.checkIfAdmin,
  twentyAttacksKataActions.destroy,
);

/* CATEGORIES ************************************************************************* */

router.get("/api/categories", categoryActions.browse);

/* BELTS ************************************************************************* */

router.get("/api/belts", beltActions.browse);

/* NOTES ************************************************************************* */
router.get(
  "/api/notes/techniques",
  authActions.verify,
  techniqueNoteActions.browse,
);

router.get(
  "/api/notes/techniques/:id",
  authActions.verify,
  techniqueNoteActions.readByMemberAndTechniqueId,
);

router.get(
  "/api/notes/kodokan/",
  authActions.verify,
  kodokanNoteActions.browseByMember,
);
router.get(
  "/api/notes/twenty-attacks/",
  authActions.verify,
  twentyAttacksNoteActions.browseByMember,
);

router.post(
  "/api/notes/techniques",
  authActions.verify,
  noteForms.validate,
  techniqueNoteActions.add,
);

router.post(
  "/api/notes/kodokan",
  authActions.verify,
  kataNoteForms.validate,
  kodokanNoteActions.add,
);
router.post(
  "/api/notes/twenty-attacks/",
  authActions.verify,
  kataNoteForms.validate,
  twentyAttacksNoteActions.add,
);

router.put(
  "/api/notes/techniques/:id",
  authActions.verify,
  noteForms.validate,
  techniqueNoteActions.edit,
);

router.put(
  "/api/notes/kodokan/:id",
  authActions.verify,
  kataNoteForms.validate,
  kodokanNoteActions.edit,
);

router.put(
  "/api/notes/twenty-attacks/:id",
  authActions.verify,
  kataNoteForms.validate,
  twentyAttacksNoteActions.edit,
);

router.delete(
  "/api/notes/techniques/:id",
  authActions.verify,
  techniqueNoteActions.destroy,
);

router.delete(
  "/api/notes/kodokan/:id",
  authActions.verify,
  kodokanNoteActions.destroy,
);

router.delete(
  "/api/notes/twenty-attacks/:id",
  authActions.verify,
  twentyAttacksNoteActions.destroy,
);

/* ************************************************************************* */
export default router;
