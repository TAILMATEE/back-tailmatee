import TailUser from '../tailUser/tailUser.model.js'

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

export const existTailFriend = async (usernameTailFriend = "") => {

  const tailFriend = await TailUser.findOne({ username: usernameTailFriend });

  if (!tailFriend) {
    throw new Error(`The TailFriend ${usernameTailFriend} doesn't exists`);
  }
}