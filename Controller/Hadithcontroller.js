import express from 'express'
import Hadithservice from '../Service/Hadithservice.js';
const Hadithcontroller=express.Router()
Hadithcontroller.post('/Add',Hadithservice.add)
Hadithcontroller.get('/get',Hadithservice.get)
Hadithcontroller.get('/get_details',Hadithservice.get_details)
Hadithcontroller.delete('/delete1',Hadithservice.delete1)

export default Hadithcontroller;