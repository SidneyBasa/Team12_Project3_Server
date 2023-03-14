const express = require('express');
const router = express.Router();
const {User, Organization, Incident } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { IsUser, IsAuth, IsAdmin } = require("./ValidateUser");

// find all users
router.get("/", (request, response)=>{
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
router.post("/", async (request, response)=>{
    if(request.body.organizationName) {
        //create new user AND new org and associate them
        Organization.create({
            name:request.body.organizationName
        }).then(async orgdata=>{
            await User.create({
                name:request.body.name,
                displayName:request.body.displayName,
                password:request.body.password,
                isAuth:true,
                isAdmin:true,
                organizationId:orgdata.id
        
            })
            .then(userData=>{
                //jwt sign them in now that they are signed up
                const token = jwt.sign({
                    id:userData.id,
                    name:userData.name
                },process.env.JWT_SECRET,{
                    expiresIn:"24h"
                })
                return response.status(201).json({
                    token:token,
                    user:userData
                });
            })
            .catch(error=>{
                console.log("error:", error);
                response.status(500)
                .json({msg: "Error when creating this user", error})
            });
        }).catch(err => {
            console.log("error:", err);
                response.status(500)
                .json({msg: "Error when creating this org", err})
        });
    } else if(request.body.inviteCode) {
        //search orgs for invite code and set auths accordingly
        let orgId = -1;
        let isAuth = false;
        let isAdmin = false;
        //search normal invite codes first
        await Organization.findOne({
            where:{
                normalCode:request.body.inviteCode
            }
        }).then(org=>{
            if(org) {
                orgId = org.id;
            }
        }).catch(err=>{
            response.status(500).json({msg:'Error searching for invite org.',err});
        });
        //if none found, search auth invite codes
        if(orgId < 0) {
            await Organization.findOne({
                where:{
                    authCode:request.body.inviteCode
                }
            }).then(org=>{
                if(org) {
                    isAuth = true;
                    orgId = org.id;
                }
            }).catch(err=>{
                response.status(500).json({msg:'Error searching for invite org.',err});
            });
        }
        //if still none found, search admin invite codes
        if(orgId < 0) {
            await Organization.findOne({
                where:{
                    adminCode:request.body.inviteCode
                }
            }).then(org=>{
                if(org) {
                    isAuth = true;
                    isAdmin = true;
                    orgId = org.id;
                }
            }).catch(err=>{
                response.status(500).json({msg:'Error searching for invite org.',err});
            });
        }
        console.log(orgId);
        //if nothing found, bail
        if(orgId < 0) {
            response.status(400).json({msg:'Bad invite code'});
        } else {
            //create user if all is correct
            User.create({
                name:request.body.name,
                displayName:request.body.displayName,
                password:request.body.password,
                isAuth:isAuth,
                isAdmin:isAdmin,
                organizationId:orgId
            })
            .then(userData=>{
                //jwt sign them in now that they are signed up
                const token = jwt.sign({
                    id:userData.id,
                    name:userData.name
                },process.env.JWT_SECRET,{
                    expiresIn:"24h"
                })
                return response.status(201).json({
                    token:token,
                    user:userData
                });
            })
            .catch(error=>{
                console.log("error:", error);
                response.status(500)
                .json({msg: "Error when creating this user", error})
            });
        }
    } else {
        response.status(400).json({msg:'Bad request - no invite code or new org name.'});
    }
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
            return response.status(401).json({msg:"User was not found"});
        } else if (!bcrypt.compareSync(request.body.password, foundUser.password)) { 
            // Unencrypt the data, then check if the password matches the stored password
            console.log(foundUser.password);
            console.log(request.body.password);
            return response.status(401).json({msg:"Incorrect password"});
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
                expiresIn:"24h"
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