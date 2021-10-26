const { createPool} = require("mysql");

const pool = createPool({
host: "localhost",
port: "3306",
user: "root",
password: "picodulce",
database: "todo_app",
connectionLimit: 10,
connectTimeout: 100000,
multipleStatements: true

});
module.exports= pool;  