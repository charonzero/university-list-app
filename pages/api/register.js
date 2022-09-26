import { createUser,findUser } from "../../lib/user";

export default async function handler(req, res) {
  try {
    var user = await findUser(req.body.values.email);
    console.log(user)
    if(!user){
      await createUser(req.body.values.email, req.body.values.password);
      res.status(200);
    }else{
      res.status(409);
    }
    
  } catch {
    res.status(500);
  }
}
