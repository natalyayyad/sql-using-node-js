// resource: https://www.youtube.com/watch?v=QqHaDrsj8VA&list=PLsCs8YwnvP88lUF2Z5qRP28pXBh3ef9Rz

import express, { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Mirsal API service!');
})

app.get('/mirsal/getUserInfo/:imei', (req: Request, res: Response) => {

    var pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        // port: process.env.DB_PORT,
        connectionLimit: 10,
        multipleStatements: true
    })

    pool.getConnection(function (err: any, conn: any) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                status: 400,
                message: 'error during the connection'
            })
            return;
        }

        console.log(req.params.imei);

        //if you got a connections
        conn.query('SELECT * FROM Devices WHERE user = ?', [req.params.imei], function (error: any, rows: any) {
            if (error) {
                conn.release();
                console.log(error)
                res.send({
                    success: false,
                    status: 400,
                    message: 'error during query'
                })
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

        })
    })
})

app.post('/mirsal/getGroups/:companyName', (req: Request, res: Response) => {
    res.send({
        data: req.body
    })
})

app.post('/mirsal/getUsers/:companyId', (req: Request, res: Response) => {
    res.send({
        data: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}!`);
})