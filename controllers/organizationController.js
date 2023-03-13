const router = require('express').Router();
const {User, Organization, Incident } = require('../models');

// get all organizations
// include associated incidents
router.get('/', (request, response) => {
  Organization.findAll({
    include:[ User ]
  }).then(organizationdata=>{
    response.json(organizationdata)
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred at organizations.js get all route",
        error:error
    })
})
});

// get one Organization by id value
// Include associated users
router.get('/:id', (request, response) => {
  Organization.findByPk(request.params.id, {
    include:[User]
  }).then(organizationdata=>{
    if(organizationdata){
       return  response.json(organizationdata);
    } else {
      response.status(404).json({
            msg:"no such record of this organization"
        })
    }
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred at the get one organization route by primary key",
        error:error
    })
})
});

// create a new Organization
router.post('/', async (request, response) => {
Organization.create(request.body).then(organizationdata=>{
    response.status(201).json(organizationdata)
}).catch(error=>{
    console.log(error);
    response.status(500).json({
        msg:"an error occurred",
        error:error
    })
})
});

// update a organization 
router.put('/:id', (request, response) => {
  // update a Organization's name by its `id` value
    Organization.update({
        name:request.body.name,
},{
    where:{
        id:request.params.id
    }
}).then(organizationdata=>{
    if(organizationdata[0]){
        return response.json(organizationdata)
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

// delete Organization by its id value
router.delete('/:id', (request, response) => {
    Organization.destroy({
    where:{
        id:request.params.id
    }
}).then(organizationdata=>{
    if(organizationdata){
        return response.json(organizationdata)
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
