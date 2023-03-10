const express = require('express');
// const allRoutes = require('./controllers');
const sequelize = require('./config/connection');

// Invokes the express application to the app variable
const app = express();
const PORT = process.env.PORT || 3001;

// const {Organization, User, Incident} = require('./models');

// Express middleware
app.use(express.urlencoded({ extended:true }));
// ahhhhh!          V
app.use(express.json());

// app.use('/', allRoutes);
app.get("/", (request, response)=> {
    response.send("homepage")
})

// sequelize ORM processing
sequelize.sync({ force:true }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT);
    })
})