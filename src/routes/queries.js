const getRoutes = "SELECT * FROM routes";
const getRouteById = "SELECT * FROM routes WHERE id = $1";
const checkRoute_nameExists = "SELECT s FROM routes s WHERE s.route_name = $1";
const addRoute = "INSERT INTO routes (route_name, route_short_name) VALUES ($1, $2)";
const removeRoute = "DELETE FROM routes WHERE id = $1";
const updateRoute = "UPDATE routes SET route_name = $1, route_short_name = $2 WHERE id = $3";


module.exports ={
    getRoutes,
    getRouteById,
    checkRoute_nameExists,
    addRoute,
    removeRoute,
    updateRoute
}