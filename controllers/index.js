const router = require('express').Router();
const userRoutes = require('./userController');
const organizationRoutes = require('./organizationController');
const incidentRoutes = require('./incidentController');
const frontEndController = require('./frontEndController');

router.use('/users', userRoutes);
router.use('/organizations', organizationRoutes);
router.use('/incidents', incidentRoutes);
router.use('/', frontEndController)

module.exports = router;
