import TailUser from '../tailUser/tailUser.model.js'

export const existentUsername = async (username = "") => {
    const existUsername = await TailUser.findOne({ username });
  
    if (existUsername) {
      throw new Error(`The Username ${username} was register`);
    }
};