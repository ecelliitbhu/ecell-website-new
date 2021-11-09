// import express, { request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import encrypt from '../../encryption/encryt.js';
import dotenv from 'dotenv'
import nc from "next-connect";
import dbConnect from '../../lib/dbConnect.js'

const Router=nc();
dotenv.config();

//models
import Startup from "../../models/Startup.js";
import Student from "../../models/Student.js";
import Response from '../../models/Response.js';

Router.post("/api/signup/student",async(req,res)=>{
    await dbConnect()
    try{
        //check whether email or phone already exists
        const checkUserByEmail=await Student.findOne({
            email : req.body.email
        });

        if(checkUserByEmail){
            // console.log(`${req.body.firstName} exists`);
            return res.json({error:"User already exits"});
        }

        //hashing and salting
        const hashedPassword = await encrypt(req.body.password);

        //DB
        await Student.create({
            googleId: req.body.googleId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            linkedin: req.body.linkedin,
            github: req.body.github,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            description: req.body.description,
            Postbystudent: new Response({})
        })

        let firstName = req.body.firstName;
        let email = req.body.email;

        //JWT AUth Token
        const token = jwt.sign({user:{firstName, email}}, process.env.SECRET_KEY,{
            expiresIn:86400
        });
        res.send({ firstName, token});
        return res.status(200).json({token});

    } catch(error){
        return res.json({error: error.message});
    }
})


Router.post("/api/signup/startup",async(req,res)=>{
    await dbConnect()
    try{
        //check whether email or phone already exists
        const checkUserByEmail=await Startup.findOne({
            email : req.body.email
        });

        if(checkUserByEmail){
            return res.json({error:"User already exits"});
        }

        //hashing and salting
        const hashedPassword = await encrypt(req.body.password);

        //DB
        await Startup.create({
            googleId: req.body.googleId,
            Name: req.body.firstName,
            phone: req.body.phone,
            email: req.body.email,
            linkedin: req.body.linkedin,
            github: req.body.github,
            landingPageLink: req.body.landingPageLink,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            description: req.body.description,
            currentState : req.body.currentState,
            founder : req.body.founder,
            sector : req.body.sector,
            Postbystudent: new Response({})
        })

        let firstName = req.body.firstName;
        let email = req.body.email;

        //JWT AUth Token
        const token = jwt.sign({user:{firstName, email}}, process.env.SECRET_KEY,{
            expiresIn:86400
        });

        return res.status(200).json({token});

    } catch(error){
        return res.json({error: error.message});
    }
})

export default Router;