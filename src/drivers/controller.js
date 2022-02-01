const pool = require('../../db');
const queries = require('./queries')

const getDrivers = (req, res) => {
    pool.query(queries.getDrivers, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getDriverById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getDriverById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addDriver = (req,res) => {
    const {name, phone_number, identification_number} = req.body;

    // check if identification_number exists
    pool.query(queries.checkIdentification_numberExists, [identification_number], (error, results) => {
        if (results.rows.length){
            return (res.send("Driver already exists."));
            
        }

        // add driver to db
        pool.query(queries.addDriver, [name, phone_number, identification_number], (error, results) =>{
            if (error) throw error;
            res.status(201).send("Driver created successfully.");
        });
    });
};


const removeDriver = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getDriverById, [id], (error, results) => {
        const noDriverFound = !results.rows.length;
        if (noDriverFound) {
            res.send("Driver does not exist in database.");
        }

        pool.query(queries.removeDriver, [id], (error, results) => {
           if (error) throw error;
           res.status(200).send("Driver removed successfully");
        });
        
    });
};


const updateDriver = (req, res) => {
    const id = parseInt(req.params.id);
    const { phone_number, identification_number } = req.body;

    // check if identification_number exists
    pool.query(queries.checkIdentification_numberExists, [identification_number], (error, results) => {
        if (results.rows.length){
            return (res.send("Driver already exists."));
            
        }

        pool.query(queries.getDriverById, [id], (error, results) => {
        const noDriverFound = !results.rows.length;
            if (noDriverFound) {
            res.send("Driver does not exist in database.");
        }

        pool.query(queries.updateDriver, [phone_number, identification_number, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Driver Updated Successfuly");
        });
    });
});
};

module.exports = {
    getDrivers,
    getDriverById,
    addDriver,
    removeDriver,
    updateDriver,
}