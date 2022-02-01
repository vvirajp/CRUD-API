const { Router } = require('express');
const controller = require('./controller');
const { authenticateToken } = require('../../middleware/authorization');

const router = Router();

router.get('/',authenticateToken, controller.getTrips);
router.get('/:id',authenticateToken, controller.getTripById);
router.post('/',authenticateToken, controller.addTrip);
router.delete('/:id',authenticateToken, controller.removeTrip);
router.put('/:id',authenticateToken, controller.updateTrip);


module.exports = router;