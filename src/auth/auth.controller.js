import TailUser from '../tailUser/tailUser.model.js';

import { generateJWT } from '../helpers/generate-jwt.js';

import bcryptjs from 'bcryptjs';

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
            msg: `Login Successful, your token is: ${token}`,
            tailUser
        })

    }catch(e){

        console.log(e);
        res.status(500).json({
            msg: 'Comunicate with the support'
        })

    }

  };