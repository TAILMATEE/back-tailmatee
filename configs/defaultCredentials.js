import TailUser from '../src/tailUser/tailUser.model.js';

import bcryptjs from 'bcryptjs';

import { format , parse} from 'date-fns';

export const withoutTime = (date) =>{

    const parseDate = parse(date, 'dd-MM-yyyy', new Date()); // Format to received Postman

    parseDate.setUTCHours(0, 0, 0, 0);

    const formattedDate = format(parseDate, 'yyyy-MM-dd'); //Format MongoDB

    return parseDate;

}

export const adminCredentials = async () => {

    const bds = '12-04-2005';

    const formatDate = withoutTime(bds);

    console.log(formatDate);

    const tailAdmin = new TailUser({

        name: 'ADMINB',

        lastname: 'ADMINB',

        username: 'ADMINB',

        description: 'This is the default admin account',

        birthdate: formatDate,

        age: 19,

        gender: 'male',

        email: 'adminb@gmail.com',

        password: 'ADMINB',

        imgProfile: '',

        role: 'tailAdmin',

        phone: '+502 00000000',

        typeAccount: 'public',

        status: 'active'

    })

    const salt = bcryptjs.genSaltSync();

    tailAdmin.password = bcryptjs.hashSync(tailAdmin.password, salt);

    await tailAdmin.save();

    console.log('Admin Credentials Created');

}