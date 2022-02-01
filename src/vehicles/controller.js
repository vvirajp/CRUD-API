const pool = require("../../db");
const queries = require("./queries");


const getVehicles = (req, res) => {
  pool.query(queries.getVehicles, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getVehicleById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getVehicleById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addVehicle = (req, res) => {
  const { registration_number, vehicle_model } = req.body;

  // check if registration_number exists
  pool.query(
    queries.checkRegistration_numberExists,
    [registration_number],
    (error, results) => {
      if (results.rows.length) {
        return res.send("Vehicle already exists.");
      }

      // add vehicle to db
      pool.query(
        queries.addVehicle,
        [registration_number, vehicle_model],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Vehicle added successfully.");
        }
      );
    }
  );
};

const removeVehicle = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getVehicleById, [id], (error, results) => {
    const noVehicleFound = !results.rows.length;
    if (noVehicleFound) {
      res.send("Vehicle does not exist in database.");
    }

    pool.query(queries.removeVehicle, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Vehicle removed successfully");
    });
  });
};

const updateVehicle = (req, res) => {
  const id = parseInt(req.params.id);
  const { registration_number, vehicle_model } = req.body;

  // check if registration_number already exists
  pool.query(
    queries.checkRegistration_numberExists,
    [registration_number],
    (error, results) => {
      if (results.rows.length) {
        return res.send(
          "Vehicle with this registration number already exists."
        );
      }

      pool.query(queries.getVehicleById, [id], (error, results) => {
        const noVehicleFound = !results.rows.length;
        if (noVehicleFound) {
          res.send("Vehicle does not exist in database.");
        }

        pool.query(
          queries.updateVehicle,
          [registration_number, vehicle_model, id],
          (error, results) => {
            if (error) throw error;
            res.status(200).send("Vehicle Updated Successfuly");
          }
        );
      });
    }
  );
};
module.exports = {
  getVehicles,
  getVehicleById,
  addVehicle,
  removeVehicle,
  updateVehicle,
};
