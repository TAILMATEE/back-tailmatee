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

    //const birthMonth = dy.getMonth();
    
    //const birthDate = dy.getDate();

    if(birthYear < 0){

        throw new Error("The year can't be less than 0");

    }

}