const express = require('express');
const router = express.Router();
const {User, Organization, Incident } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// find all users
router.get("/", (request, response)=>{
    console.log('got here');
    User.findAll().then(usageData=>{
        response.json(usageData)
    }).catch(error=>{
        console.log(error);
        response.status(500).json({msg: "error", error})
    })
})


// get one user
router.get("/:id", (request, response)=>{

    User.findByPk(request.params.id, {
        include:[Incident]
    })
    .then(userdata=>{
        response.json(userdata)
    })
    .catch(error=>{
        console.log(error);
        response.status(500)
        .json({msg:"error getting user and incident reports!", error})
    })
})

// post route to create a user
// post route http://localhost:3001/users
router.post("/", (request, response)=>{
    User.create({
        name:request.body.name,
        displayName:request.body.displayName,
        password:request.body.password,
        isAuth:request.body.isAuth,
        isAdmin:request.body.isAdmin,
        organizationId:request.body.organizationId

    })
    .then(userdata=>{
        response.json(userdata)
    })
    .catch(error=>{
        console.log("error:", error);
        response.status(500)
        .json({msg: "Error when creating this user name", error})
    })
})

// dashboard route
// get route http://localhost:3001/users/dashboard
router.get("/dashboard",(request,response)=>{
    //TODO: get userdata from jwt, verify jwt
    const token = request.headers?.authorization?.split(" ")[1]
    console.log(request.headers)
    console.log(token)
    if(!token){
        return response.status(403).json({msg:"invalid or missing token"})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        console.log(data);
        User.findByPk(data.id).then(foundUser=>{

            return response.json(foundUser)
        })
    } catch (err) {
        console.log(err);
        return response.status(403).json({msg:"invalid or missing token"})
    }
})


// login route
// post route http://localhost:3001/users/login
router.post("/login", (request, response)=>{
   
    User.findOne({
        where:{
            name:request.body.name
        }
    }
    // console.log("Test at username", username)
    )
    // check of if User object was found
    .then(foundUser=>{
        if(!foundUser){
            console.log("Test at line 65 at login route in UserController")
            // if the User obhect was not found return an unauthrized status of 401
            return response.status(401).json({msg:"User was not found"})
        } else if (!bcrypt.compareSync(request.body.password, foundUser.password)) { 
            // Unencrypt the data, then check if the password matches the stored password
        } else {
            // new json webtoken method sign
            // sign method uses three arguments
            // 1. payload
            // 2. JWT Secret string
            // 3. option for 2 hour expiration
            const token = jwt.sign({
                id:foundUser.id,
                username:foundUser.username
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            console.log("\x1B[33m======================================================================================================================================================================")
            console.log("\x1B[36m value of json web token:", token);
            console.log("\x1B[33m======================================================================================================================================================================\x1b[0m")
            return response.json({
                token:token,
                user:foundUser
            })
            
        }
    })
    .catch(error=>{
        console.log("\x1B[33m----------------------------------------------")
        console.log("\x1B[36mPost request error:", error.message);
        console.log("\x1B[33m----------------------------------------------\x1b[0m")
        response.status(500)
        .json({msg:"Error at login!", error})
    })
})

// logout route
// get request http://localhost:3001/users/logout
router.get("/logout", (request, response)=>{

    // Deleting the log in data from the cookie
    // request.session.destroy();

    // TODO review json web tokens

    response.send("The user has logged out")
})


module.exports = router;