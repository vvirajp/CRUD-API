const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const driverRoutes = require('./src/drivers/routes');
const vehicleRoutes = require('./src/vehicles/routes');
const routeRoutes = require('./src/routes/routes');
const tripRoutes = require('./src/trips/routes');
const userRoutes = require('./users/routes');




const app = express();
dotenv.config();
app.use(cookieParser());
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello From Viraj");
})

app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/users', userRoutes);


app.listen(port, () => console.log(`app listening on port ${port}`));