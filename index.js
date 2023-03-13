const express = require('express');
// const allRoutes = require('./controllers');
const sequelize = require('./config/connection');
const everyRoute = require('./controllers');
const cors = require('cors');

// Invokes the express application to the app variable
const app = express();
const PORT = process.env.PORT || 3001;

const {Organization, User, Incident} = require('./models');

app.use(cors());

// Express middleware
app.use(express.urlencoded({ extended:true }));
// ahhhhh!          V
app.use(express.json());

app.get('/', (req,res)=>{
    res.json('hi');
});

app.use(everyRoute);

// app.use('/', allRoutes);
app.get("*", (request, response)=> {
    response.status(404).send("404 - Page Not Found")
})

// sequelize ORM processing
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT);
    })
})