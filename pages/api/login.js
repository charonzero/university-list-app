// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { findUser, validatePassword } from "../../lib/user";
import { setLoginSession, getLoginSession } from "../../lib/auth";

export default async function handler(req, res) {
  try {
    var user = await findUser(req.body.values.email);
    var checkUser = await validatePassword(
      user[0].salt,
      req.body.values.password,
      user[0].hash
    );
    delete user[0].favourites;
    if (checkUser) {
      await setLoginSession(res, user[0]);
      res.status(200).json({ session: await getLoginSession(req) });
    } else {
      res.status(401);
    }
  } catch {
    res.status(500);
  }
}
