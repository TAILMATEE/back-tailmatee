import TailUser from '../src/tailUser/tailUser.model.js';

import ValidationTailUser from '../src/generalValidation/validationTailUser.model.js';

import validationDenoucement from '../src/generalValidation/validationDenoucement.js';

import bcryptjs from 'bcryptjs';

import { format , parse } from 'date-fns';

import { calculateAge } from '../src/auth/auth.controller.js'

export const withoutTime = (date) =>{

    const parseDate = parse(date, 'MM-dd-yyyy', new Date()); // Format to received Postman

    parseDate.setUTCHours(0, 0, 0, 0);

    const formattedDate = format(parseDate, 'yyyy-MM-dd'); //Format MongoDB

    return parseDate;

}

export const adminCredentials = async () => {

    const bds = '12-04-2005';

    const formatDate = withoutTime(bds);

    const age = calculateAge(formatDate);

    const tailAdmin = new TailUser({

        name: 'ADMINB',

        lastname: 'ADMINB',

        username: 'ADMINB',

        description: 'This is the default admin account',

        birthdate: formatDate,

        age,

        gender: 'male',

        email: 'adminb@gmail.com',

        password: 'ADMINB',

        imgProfile: '',

        role: 'tailAdmin',

        phone: '+502 00000000',

        typeAccount: 'public',

        status: 'active'

    })

    const tailSupport = new TailUser({

        name: 'SUPPORT',

        lastname: 'SUPPORT',

        username: 'SUPPORT',

        description: 'This is the default support account',

        birthdate: formatDate,

        age,

        gender: 'male',

        email: 'support@tailmatee.com',

        password: 'Support12!',

        imgProfile: '',

        role: 'tailSupport',

        phone: '+502 00000000',

        typeAccount: 'public',

        status: 'active'

    })

    const salt = bcryptjs.genSaltSync();

    tailAdmin.password = bcryptjs.hashSync(tailAdmin.password, salt);

    await tailAdmin.save();

    const salt2 = bcryptjs.genSaltSync();

    tailSupport.password = bcryptjs.hashSync(tailSupport.password, salt2);

    await tailSupport.save();

    const male = new ValidationTailUser({

        gender: 'male',

    })

    const female = new ValidationTailUser({

        gender: 'female',

    })

    await male.save();

    await female.save();

    const admin = new ValidationTailUser({

        role: 'tailAdmin',

    })

    const user = new ValidationTailUser({

        role: 'tailUser',

    })

    const house = new ValidationTailUser({

        role: 'tailHouse'

    })

    const support = new ValidationTailUser({

        role: 'tailSupport'

    })

    await admin.save();

    await user.save();

    await house.save();

    await support.save();

    const privateAccount = new ValidationTailUser({

        typeAccount: 'private'

    });

    const publicAccount = new ValidationTailUser({ 
        
        typeAccount: 'public' 
    
    });

    await publicAccount.save();

    await privateAccount.save();

    const active = new ValidationTailUser({

        status: 'active'

    });

    const inactive = new ValidationTailUser({

        status: 'inactive'

    });

    const blocked = new ValidationTailUser({

        status: 'blocked'

    });

    await active.save();

    await inactive.save();

    await blocked.save();

    const denoucement_in_progress = new validationDenoucement({

        status: 'in-progress'

    })

    const denoucement_done = new validationDenoucement({

        status: 'done'

    })

    const denoucement_fake = new validationDenoucement({

        status: 'fake'

    })

    await denoucement_in_progress.save();

    await denoucement_done.save();

    await denoucement_fake.save();

    

    console.log('Admin Credentials Created');

}