import TailUser from '../tailUser/tailUser.model.js';

import { generateJWT } from '../helpers/generate-jwt.js';

import bcryptjs from 'bcryptjs';

import { withoutTime } from '../../configs/defaultCredentials.js';

export const calculateAge = (birthdate) =>{

    const birthYear = birthdate.getFullYear();

    const birthMonth = birthdate.getMonth();
    
    const birthDate = birthdate.getDate();

    const actualYear = new Date().getFullYear();

    const actualMonth = new Date().getMonth();

    const actualDay = new Date().getDate();

    let age = actualYear - birthYear;

    console.log(birthMonth);

    console.log(birthDate);

    if((actualMonth - (birthMonth + 1) ) < 0){

        if((actualDay - (birthDate + 1)) < 0){

            age = age - 1;

        }

    }

    return age;

}

export const login = async (req, res) => {

    try{

        const { usernameOrEmail, password } = req.body;

        let tailUser;

        let answer = '';

        if(usernameOrEmail.includes('@')) {

            tailUser = await TailUser.findOne({ email: usernameOrEmail });

            console.log(tailUser);

            answer = 'Email';

        }else{

            tailUser = await TailUser.findOne({ username: usernameOrEmail });

            answer = 'Username';

        }
    
        if (!tailUser) {
            return res.status(400).json({
            msg: `Wrong Credentials, ${answer} doesn't exists in database`
            })
        }

        if (tailUser.state == 'inactive' || tailUser.state == 'blocked') {
            return res.status(400).json({
            msg: `The User doesn't have permition to enter`
            })
        }

        const validPassword = bcryptjs.compareSync(password, tailUser.password)
        if (!validPassword) {
            return res.status(400).json({
            msg: 'Wrong Password'
            })
        }

        const token = await generateJWT(tailUser.id)

        res.status(200).json({
            token,
            tailUser
        })

    }catch(e){

        console.log(e);
        res.status(500).json({
            msg: 'Comunicate with the support'
        })

    }

  };

export const register = async (req, res) => {

    const { name, lastname, username, birthdate, gender, email, password, phone } = req.body;

    const formatDate = withoutTime(birthdate);

    const age = calculateAge(formatDate);

    const tailUser = new TailUser({

        name,
        lastname,
        username,
        birthdate: formatDate,
        age,
        gender,
        email,
        password,
        role: 'tailUser',
        phone,
        typeAccount: 'public',
        status: 'active'

    });

    const salt = bcryptjs.genSaltSync();

    tailUser.password = bcryptjs.hashSync(tailUser.password, salt);

    await tailUser.save();

    res.status(200).json({
        msg: `User created Successfully: Username: ${username}, password: ${password}`
      });

}