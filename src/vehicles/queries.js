const getVehicles = "SELECT * FROM vehicles";
const getVehicleById = "SELECT * FROM vehicles WHERE id = $1";
const checkRegistration_numberExists = "SELECT s FROM vehicles s WHERE s.registration_number = $1";
const addVehicle = "INSERT INTO vehicles (registration_number, vehicle_model) VALUES ($1, $2)";
const removeVehicle = "DELETE FROM vehicles WHERE id = $1";
const updateVehicle = "UPDATE vehicles SET registration_number = $1, vehicle_model = $2 WHERE id = $3";

module.exports = {
    getVehicles,
    getVehicleById,
    checkRegistration_numberExists,
    addVehicle,
    removeVehicle,
    updateVehicle
};