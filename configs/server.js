'use strict'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import apiLimiter from '../src/middlewares/validate-PetitionsLimit.js'
import csrfProtection from '../src/middlewares/csrfProtection.js'
import cookieParser from 'cookie-parser'

import { dbConnection } from './mongo.js'
import {adminCredentials} from './defaultCredentials.js'

import TailUser from '../src/tailUser/tailUser.model.js';
import TailFriend from '../src/tailFriend/tailFriend.routes.js';

import authRoutes from '../src/auth/auth.routes.js';
import tailUserRoutes from '../src/tailUser/tailUser.routes.js';
import fileUpload from 'express-fileupload'

class Server {
    constructor(){

        this.app = express()
        this.port = process.env.PORT

        this.authPath = '/tailmatee/v1/auth'
        this.tailFriendPath = '/tailmatee/v1/tailFriend'

        this.tailUserPath = '/tailmatee/v1/tailUser'

        this.middlewares();
        this.connectDB();
        this.defaultCredentials();
        this.routes();
        
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
        this.app.use(fileUpload())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(apiLimiter)
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        //this.app.use(cookieParser())
        //this.app.use(csrfProtection);

    }

    routes(){

        this.app.use(this.authPath, authRoutes);
        this.app.use(this.tailFriendPath, TailFriend);

        this.app.use(this.tailUserPath, tailUserRoutes);

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default Server;