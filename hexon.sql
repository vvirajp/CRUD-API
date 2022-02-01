CREATE DATABASE hexon;

\c hexon             --TO CONNECT TO OUR DB

CREATE TABLE drivers(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
phone_number INT,
identification_number VARCHAR(255)); 



CREATE TABLE vehicles(
id SERIAL PRIMARY KEY,
registration_number VARCHAR(255),
vehicle_model VARCHAR(255));



CREATE TABLE routes(
id SERIAL PRIMARY KEY,
route_name VARCHAR(255),
route_short_name VARCHAR(255));



CREATE TABLE trips(
id SERIAL PRIMARY KEY,
driver_id INT,
vehicle_id INT,
route_id INT,
started_at VARCHAR(255),
ended_at VARCHAR(255),
FOREIGN KEY (driver_id) REFERENCES drivers(id),
FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
FOREIGN KEY (route_id) REFERENCES routes(id));


CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255));


