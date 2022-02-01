const { Router } = require('express');
const controller = require('./controller')
const { authenticateToken } = require('../../middleware/authorization');

const router = Router();

router.get('/',authenticateToken, controller.getVehicles);
router.get('/:id',authenticateToken, controller.getVehicleById);
router.post('/',authenticateToken, controller.addVehicle);
router.delete('/:id',authenticateToken, controller.removeVehicle);
router.put('/:id',authenticateToken, controller.updateVehicle);







module.exports = router;

