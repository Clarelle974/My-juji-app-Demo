const argon2 = require("argon2");
//depuis server : node src/middlewares/generateHashedPassword.js

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const password = "monmdpdedemo";

async function hashPassword() {
  try {
    const hashedPassword = await argon2.hash(password, hashingOptions);
    console.info(hashedPassword);
  } catch (error) {
    console.error("Erreur lors du hashage du mot de passe :", error);
  }
}

hashPassword();
