const pool = require("../../db");
const queries = require("./queries");

const getTrips = (req, res) => {
  pool.query(queries.getTrips, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getTripById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getTripById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addTrip = (req, res) => {
  const { driver_id, Trip_id, route_id, started_at, ended_at } = req.body;

  pool.query(
    queries.addTrip,
    [driver_id, Trip_id, route_id, started_at, ended_at],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Trip added successfully.");
    }
  );
};

const removeTrip = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getTripById, [id], (error, results) => {
    const noTripFound = !results.rows.length;
    if (noTripFound) {
      res.send("Trip does not exist in database.");
    }

    pool.query(queries.removeTrip, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Trip removed successfully.");
    });
  });
};

const updateTrip = (req, res) => {
  const id = parseInt(req.params.id);
  const {driver_id, vehicle_id, route_id, started_at, ended_at } = req.body;


      pool.query(queries.getTripById, [id], (error, results) => {
        const noTripFound = !results.rows.length;
        if (noTripFound) {
          res.send("Trip does not exist in database.");
        }

        pool.query(
          queries.updateTrip,
          [driver_id, vehicle_id, route_id, started_at, ended_at, id],
          (error, results) => {
            if (error) throw error;
            res.status(200).send("Trip Updated Successfuly");
          }
        );
      });
    };
  


module.exports = {
  getTrips,
  getTripById,
  addTrip,
  removeTrip,
  updateTrip,
};
