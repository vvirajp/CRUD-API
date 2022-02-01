const getUsers = "SELECT * FROM users";
const checkUsernameExists = "SELECT s FROM users s WHERE s.username = $1";
const getUserPassword = "SELECT s FROM users s WHERE s.password = $1";
const addUser = "INSERT INTO users (username, password) VALUES ($1, $2)";
const getUserById = "SELECT * FROM users WHERE id = $1";
const removeUser = "DELETE FROM users WHERE id = $1";
const getUserByUsername = "SELECT * FROM users WHERE username = $1";



module.exports = {
    getUsers,
    checkUsernameExists,
    addUser,
    removeUser,
    getUserById,
    getUserByUsername,
    getUserPassword,
}