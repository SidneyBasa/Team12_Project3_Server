const router = require('express').Router();
const {User, Organization, Incident } = require('../models');
const bcrypt = require("bcrypt");
const { IsUser, IsAuth, IsAdmin } = require("./ValidateUser");

// get all incidents
// include user
router.get('/', async (request, response) => {
    if(!(await IsUser(request.headers?.authorization?.split(" ")[1]))) {
        return response.status(403).json({msg:"Invalid access."});
    }
  Incident.findAll({
    include:[ User ]
  }).then(incidentdata=>{
    response.json(incidentdata)
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred at incident.js get all route",
        error:error
    })
})
});

// get one incident by id value
router.get('/:id', async (request, response) => {
    if(!(await IsUser(request.headers?.authorization?.split(" ")[1]))) {
        return response.status(403).json({msg:"Invalid access."});
    }
  Incident.findByPk(request.params.id, {
    include:[User]
  }).then(incidentdata=>{
    if(incidentdata){
       return  response.json(incidentdata);
    } else {
      response.status(404).json({
            msg:"no such record of this incident"
        })
    }
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred at incident get route by primary key",
        error:error
    })
})
});

// create a new incident
router.post('/', async (request, response) => {
    if(!(await IsAuth(request.headers?.authorization?.split(" ")[1]))) {
        return response.status(403).json({msg:"Invalid access."});
    }
Incident.create(request.body).then(incidentdata=>{
    response.status(201).json(incidentdata)
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

// update a incident 
router.put('/:id', async (request, response) => {
    if(!(await IsAuth(request.headers?.authorization?.split(" ")[1]))) {
        return response.status(403).json({msg:"Invalid access."});
    }
  // update a incident's name by its `id` value
    Incident.update({
        description:request.body.description,
        locationX:request.body.locationX, 
        locationY:request.body.locationY,
        notes:request.body.notes,
        personofinterest:request.body.personofinterest,
},{
    where:{
        id:request.params.id
    }
}).then(incidentdata=>{
    if(incidentdata[0]){
        return response.json(incidentdata)
    } else {
        return response.status(404).json({msg:"no such record"})
    }
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

// delete incident by its id value
router.delete('/:id', async (request, response) => {
    if(!(await IsAuth(request.headers?.authorization?.split(" ")[1]))) {
        return response.status(403).json({msg:"Invalid access."});
    }
    Incident.destroy({
    where:{
        id:request.params.id
    }
}).then(incidentdata=>{
    if(incidentdata){
        return response.json(incidentdata)
    } else {
        return response.status(404).json({msg:"no such record"})
    }
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

module.exports = router;
