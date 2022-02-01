const { Router } = require('express');
const controller = require('./controller');
const { authenticateToken } = require('../../middleware/authorization');

const router = Router();

router.get('/',authenticateToken, controller.getRoutes);
router.get('/:id',authenticateToken, controller.getRouteById);
router.post('/',authenticateToken, controller.addRoute);
router.delete('/:id',authenticateToken, controller.removeRoute);
router.put('/:id',authenticateToken, controller.updateRoute);




module.exports = router;