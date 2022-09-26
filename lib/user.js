import crypto from "crypto";
import excuteQuery from "./db";

export async function createUser(email, password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    email,
    hash,
    salt
  };

  try {
    const result = await excuteQuery({
      query: "INSERT INTO users (email, hash, salt) VALUES( ?, ?, ?)",
      values: [user.email, user.hash, user.salt]
    });
  } catch (error) {
    console.log(error);
  }
}

export async function findUser(email) {
  const result = await excuteQuery({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email]
  });
  return result;
}

export async function validatePassword(salt, inputPassword, hash) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = hash.toString() === inputHash;
  return passwordsMatch;
}
