import { validationResult } from "express-validator";
import { request, response } from 'express'

export const validateFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next();
}

export const validateUsernameTailFriend = async (req, res, next) => {
  const { usernameTailFriend } = req.body;
  if (!usernameTailFriend || usernameTailFriend == '') {
    return res.status(400).json({
      msg: 'Username of Tail Friend is required'
    })
  }
  next();
}

export const validatePlaceIsYours = async (req, res, next) => {
  const { placeIsYours } = req.body;
  if (placeIsYours == "false") {
    next()
  } else {
    try {
      let {attachEvidence} = req.files;
      if(attachEvidence.data){
        next();
      }
    } catch (error) {
      res.status(400).json({
        msg: 'Attach Evidence is required'
      })
    }
  }
}