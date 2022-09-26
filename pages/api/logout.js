import { logoutSession } from "../../lib/auth";

export default async function handler(req, res) {
  try {
    await logoutSession(res);
    res.redirect("/");
  } catch {
    res.status(500);
  }
}
