import excuteQuery from "./db";

export async function setfavourite(query, email) {
  try {
    const result = await excuteQuery({
      query: "UPDATE users SET favourites = ? WHERE email = ?",
      values: [query, email]
    });
  } catch (error) {
    console.log(error);
  }
}
export async function findfavourite(email) {
  const result = await excuteQuery({
    query: "SELECT favourites FROM users WHERE email = ?",
    values: [email]
  });
  return result[0].favourites;
}
