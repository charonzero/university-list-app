import { getLoginSession } from "../../lib/auth";

export default async function handler(req, res) {
  try {
    var session = await getLoginSession(req);
    res.status(200).json({ session });
  } catch {
    res.status(500);
  }
}
