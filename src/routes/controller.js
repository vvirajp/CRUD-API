const pool = require('../../db');
const queries = require('./queries');

const getRoutes = (req, res) => {
    pool.query(queries.getRoutes, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getRouteById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getRouteById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addRoute = (req,res) => {
    const {route_name, route_short_name} = req.body;

    // check if route_name exists
    pool.query(queries.checkRoute_nameExists, [route_name], (error, results) => {
        if (results.rows.length){
            return (res.send("Route already exists."));
            
        }

        // add route to db
        pool.query(queries.addRoute, [route_name, route_short_name], (error, results) =>{
            if (error) throw error;
            res.status(201).send("Route added successfully.");
        });
    });
};

const removeRoute = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getRouteById, [id], (error, results) => {
        const noRouteFound = !results.rows.length;
        if (noRouteFound) {
            res.send("Route does not exist in database.");
        }

        pool.query(queries.removeRoute, [id], (error, results) => {
           if (error) throw error;
           res.status(200).send("Route removed successfully");
        });
        
    });
};


const updateRoute = (req, res) => {
    const id = parseInt(req.params.id);
    const { route_name, route_short_name } = req.body;

    // check if route_name already exists
    pool.query(queries.checkRoute_nameExists, [route_name], (error, results) => {
        if (results.rows.length){
            return (res.send("Route with this route name already exists."));
            
        }

        pool.query(queries.getRouteById, [id], (error, results) => {
        const noRouteFound = !results.rows.length;
            if (noRouteFound) {
            res.send("Route does not exist in database.");
        }

        pool.query(queries.updateRoute, [route_name, route_short_name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Route Updated Successfuly");
        });
    });
});
};


module.exports = {
    getRoutes,
    getRouteById,
    addRoute,
    removeRoute,
    updateRoute

}