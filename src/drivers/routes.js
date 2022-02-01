const { Router } = require('express');
const { authenticateToken } = require('../../middleware/authorization');
const controller = require('./controller')

const router = Router();

router.get('/',authenticateToken, controller.getDrivers);
router.post('/',authenticateToken, controller.addDriver);
router.get('/:id',authenticateToken, controller.getDriverById);
router.delete('/:id',authenticateToken, controller.removeDriver);
router.put('/:id',authenticateToken, controller.updateDriver);


module.exports = router;