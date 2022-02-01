const { Router } = require('express');
const { authenticateToken } = require('../middleware/authorization');
const controller = require('./controller');


const router = Router();

router.get('/',authenticateToken, controller.getUsers);
router.post('/',authenticateToken, controller.addUser);
router.get('/:username',authenticateToken, controller.getUserByUsername);
router.delete('/:id',authenticateToken, controller.removeUser);
router.get('/refresh_token', controller.refreshToken);
router.post('/login', controller.loginUser);
router.delete('/refresh_token', controller.deleteRefresh);

module.exports = router;