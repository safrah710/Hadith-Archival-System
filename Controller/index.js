import express from 'express';
import UserController from './Usercontroller.js';
import Hadithcontroller from './Hadithcontroller.js';
const controller=express.Router();
controller.use('/user',UserController);
controller.use('/hadith',Hadithcontroller);
export default controller;