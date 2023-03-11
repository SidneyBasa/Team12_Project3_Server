const express = require('express');
const router = express.Router();
const {User, Organization, Incident } = require('../models');
const bcrypt = require("bcrypt");

// find all users
router.get("/", (request, response)=>{
    User.findAll().then(usageData=>{
        response.json(usageData)
    }).catch(error=>{
        console.log(error);
        response.status(500).json({msg: "error", error})
    })
})

// logout route
router.get("/logout", (request, response)=>{

    // Deleting the log in data from the cookie
    // request.session.destroy();

    // TODO review json web tokens

    response.send("The user has logged out")
})

// get one user
router.get("/:id", (request, response)=>{

    User.findByPk(request.params.id, {
        include:[Blog]
    })
    .then(userdata=>{
        response.json(userdata)
    })
    .catch(error=>{
        console.log(error);
        response.status(500)
        .json({msg:"error getting user and blog posts!", error})
    })
})

// post route to create a user
router.post("/", (request, response)=>{
    
    User.create({
        name:request.body.name,
        displayName:request.body.displayName,
        password:request.body.password,
        isAuth:request.body.isAuth,
        isAdmin:request.body.isAdmin

    })
    .then(userdata=>{
        response.json(userdata)
    })
    .catch(error=>{
        console.log("error:", error.errors[0].message);
        response.status(500)
        .json({msg: "Error when creating this user name", error})
    })
})

// login route
router.post("/login", (request, response)=>{
   
    User.findOne({
        where:{
            username:request.body.username
        }
    }
    // console.log("Test at username", username)
    )
    // check of if User object was found
    .then(userFound=>{
        if(!userFound){
            console.log("Test at line 65 at login route in UserController")
            // if the User obhect was not found return an unauthrized status of 401
            return response.status(401).json({msg:"User was not found"})
        } else {
            console.log("Test at line 69 at login route in UserController")
            // Unencrypt the data, then check if the password matches the stored password
            if(bcrypt.compareSync(request.body.password, userFound.password)){
                // tells sessions that you have logged in
                // request.session.UserId = userFound.id;

                // TODO research json web tokens

                // adds the property username to the session data
                // request.session.username = userFound.username;

                // if the password matches, return with the userFound object data
                return response.json(userFound)
            } else {
                return response.status(401).json({msg:"incorrect password"})
            }
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

module.exports = router;