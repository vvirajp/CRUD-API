const getTrips = "SELECT * FROM trips";
const getTripById = "SELECT * FROM trips WHERE id = $1";
const addTrip = "INSERT INTO trips (driver_id, vehicle_id, route_id, started_at, ended_at) VALUES ($1, $2, $3, $4, $5)";
const removeTrip = "DELETE FROM trips WHERE id = $1";
const updateTrip = "UPDATE trips SET driver_id = $1, vehicle_id = $2, route_id = $3, started_at = $4, ended_at = $5 WHERE id = $6";

module.exports = {
    getTrips,
    getTripById,
    addTrip,
    removeTrip,
    updateTrip,
}