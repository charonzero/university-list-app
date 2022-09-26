import { getLoginSession } from "../../lib/auth";
import { findfavourite, setfavourite } from "../../lib/favourite";

export default async function handler(req, res) {
  try {
    var session = await getLoginSession(req);

    if (session) {
      var favourite = await findfavourite(session.email);
      favourite = JSON.parse(favourite);
      if (req.body.value) {
        var found = false;
        for (var i = 0; i < favourite.length; i++) {
          if (favourite[i].name == req.body.value.name) {
            favourite.splice(i, 1);
            found = true;
          }
        }
        if (found != true) {
          favourite.push(req.body.value);
        }
        setfavourite(JSON.stringify(favourite), session.email);
      }
      res.status(200).json({ favourite });
    }else{
      res.status(203);
    }

 
  } catch (err) {
    res.status(500);
  }
}
