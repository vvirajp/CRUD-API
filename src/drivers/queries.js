const getDrivers = "SELECT * FROM drivers";
const getDriverById = "SELECT * FROM drivers WHERE id = $1";
const checkIdentification_numberExists = "SELECT s FROM drivers s WHERE s.identification_number = $1";
const addDriver = "INSERT INTO drivers (name, phone_number, identification_number) VALUES ($1, $2, $3)";
const removeDriver = "DELETE FROM drivers WHERE id = $1";
const updateDriver = "UPDATE drivers SET phone_number = $1, identification_number = $2 WHERE id = $3";

module.exports = {
    getDrivers,
    getDriverById,
    checkIdentification_numberExists,
    addDriver,
    removeDriver,
    updateDriver,
};