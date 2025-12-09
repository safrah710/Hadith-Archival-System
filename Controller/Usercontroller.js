import express from 'express';
import Userservice from "../Service/Userservice.js";
const userController=express.Router();
userController.get('/get',Userservice.get)
userController.post('/login',Userservice.login);
userController.post('/signup',Userservice.Signup);
userController.delete('/delete1',Userservice.delete1);
userController.post('/forgot',Userservice.forgot);
userController.post('/change',Userservice.change);
export default userController;