import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next();
}

export const validateUsernameTailFriend = async (req,res,next) => {
  const { usernameTailFriend } = req.body;
  console.log(usernameTailFriend)
  if(!usernameTailFriend || usernameTailFriend==''){
    return res.status(400).json({
      msg: 'Username of Tail Friend is required'
    })
  }
  next();
}