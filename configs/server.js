'use strict'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import apiLimiter from '../src/middlewares/validate-PetitionsLimit.js'
import csrfProtection from '../src/middlewares/csrfProtection.js'

import { dbConnection } from './mongo.js'
import {adminCredentials} from './defaultCredentials.js'

import TailUser from '../src/tailUser/tailUser.model.js';

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.middlewares();
        this.connectDB();
        this.defaultCredentials();
        
    }

    async connectDB () {
        await dbConnection();
    }

    async defaultCredentials() {

        const searchingAdminCredentials = await TailUser.findOne({
            username: 'ADMINB'});

        if (!searchingAdminCredentials) {

            adminCredentials();

        }else{

            console.log('Admin Already Created');

        }

    }

    async middlewares(){
        this.app.use(apiLimiter)
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(csrfProtection);

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default Server;