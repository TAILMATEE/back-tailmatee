import { withoutTime } from '../../configs/defaultCredentials.js';

export const maxCharactersName = async (name = "") => {
    
    const length = name.length;

    if (length < 0 || length > 51) {
        throw new Error("The Name must have 50 characters maximum");
    }

};

export const maxCharactersLastname = async (lastname = "") => {
    
    const length = lastname.length;

    if (length < 0 || length > 51) {
        throw new Error("The Lastname must have 50 characters maximum");
    }

};

export const maxCharactersUsername = async (username = "") => {
    
    const length = username.length;

    if (length < 0 || length > 21) {
        throw new Error("The Username must have 20 characters maximum");
    }

};

export const validYear = async (birthdate = "") =>{

    const dy = withoutTime(birthdate);

    const birthYear = dy.getFullYear();

    if(birthYear < 0){

        throw new Error("The year can't be less than 0");

    }

}

export const validMonth = async (birthdate = "") =>{

    const dy = withoutTime(birthdate);

    const birthMonth = dy.getMonth();

    if(birthMonth < 0 || birthMonth > 12){

        throw new Error("You need to specify a valid month");

    }

}

export const validDate = async (birthdate = "") =>{

    const dy = withoutTime(birthdate);

    const birthDate = dy.getDate();

    if(birthDate < 0 || birthDate > 32){

        throw new Error("You need to specify a valid date");

    }

}

export const validationPassword = async (password = '') => {

    let containsCapittalLetter = false
  
    let containsNumber = false
  
    let containsSpecialCharacter = false
  
    for (let i = 0; i < password.length; i++) {
  
      const char = password[i];
  
      switch (true) {
  
        case /[A-Z]/.test(char):
  
          containsCapittalLetter = true;
  
          break;
  
        case /[0-9]/.test(char):
  
          containsNumber = true;
  
          break;
  
        case /[!$%#]/.test(char):
  
          containsSpecialCharacter = true;
          
          break;
  
      }
  
    }
  
    if (!containsCapittalLetter || !containsNumber || !containsSpecialCharacter) {
    
      throw new Error(
        "The password doesn't have the necessary parameters: Capital letters, Numbers, Special Characters "
      )
    
    }
  }

export const validateBirthDate = async (birthdate = "") => {

  let count = 0;

  for (let i = 0; i < birthdate.length; i++) {

    if(birthdate[i] == '/'){

      count = count + 1;

    }

  }

  if(count != 2){

    throw new Error("You need to follow the format MM/DD/YYYY using the '/' separator of the date, month and year; exameple: 01-01-2000");

  }

}

export const validateGender = async( gender="")=>{
  if(gender!= 'FEMALE' && gender != 'MALE'){
    throw new Error("The gender must be FEMALE or MALE");
  }
}

export const validateStatusTailFriend = async (status = "") => {
  if(status!= 'ADOPTED' && status != 'FOR-ADOPTION' && status != 'LOST' && status != 'DEAD'){
    throw new Error("The status must be ADOPTED, FOR-ADOPTION, LOST or DEAD");
  }
}