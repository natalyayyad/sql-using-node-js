"use strict";
// resource: https://www.youtube.com/watch?v=QqHaDrsj8VA&list=PLsCs8YwnvP88lUF2Z5qRP28pXBh3ef9Rz
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to Mirsal API service!');
});
app.get('/mirsal/getUserInfo/:imei', (req, res) => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        // port: process.env.DB_PORT,
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            res.send({
                success: false,
                status: 400,
                message: 'error during the connection'
            });
            return;
        }
        console.log(req.params.imei);
        //if you got a connections
        conn.query('SELECT * FROM Devices WHERE user = ?', [req.params.imei], function (error, rows) {
            if (error) {
                conn.release();
                console.log(error);
                res.send({
                    success: false,
                    status: 400,
                    message: 'error during query'
                });
                return;
            }
            //for simlicity, just send the code
            res.send({
                status: 200,
                message: 'success',
                data: rows
            });
            //close the connection
            conn.release();
        });
    });
});
app.post('/mirsal/getGroups/:companyName', (req, res) => {
    res.send({
        data: req.body
    });
});
app.post('/mirsal/getUsers/:companyId', (req, res) => {
    res.send({
        data: req.body
    });
});
app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}!`);
});
