import TailUser from '../tailUser/tailUser.model.js'
import TailFriend from '../tailFriend/tailFriend.model.js';
import ValidationTailUser from '../generalValidation/validationTailUser.model.js'

export const existentUsername = async (username = "") => {
  const existUsername = await TailUser.findOne({ username });

  if (existUsername) {
    throw new Error(`The Username ${username} was register`);
  }
};

export const existentGender = async (gender = "") => {

  const existGender = await ValidationTailUser.findOne({ gender });

  if (!existGender) {
    throw new Error(`The Gender ${gender} doesn't exists`);
  }

}

export const existentEmail = async (email = "") => {

  const existEmail = await TailUser.findOne({ email });

  if (existEmail) {

    throw new Error(`The Email ${email} was already register`);

  }

}

export const validateMyTailFriend = async(req,res,next)=>{
  const {_id,username} = req.tailUser;
  const {usernameTailFriend} = req.body;
  const tailFriend = await TailFriend.findOne({username:`${username}/${usernameTailFriend}`});
  if(!tailFriend){
    return res.status(400).json({
      msg: "Do not have a tailFriend with this username"
    })
  }else{
    if(tailFriend.tailOwner.toString() !== _id.toString()){
      return res.status(401).json({
        msg: "You don't have permissions"
      })
    }
  }
  next();
}

export const validateExistsTailFriend = async (usernameTailFriend = "") => {
  const tailFriend = await TailFriend.findOne({ username: usernameTailFriend });
  if (!tailFriend) {
    throw new Error(`The Username ${usernameTailFriend} doesn't exists`);
  }
}