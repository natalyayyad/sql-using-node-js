// resource: https://www.youtube.com/watch?v=QqHaDrsj8VA&list=PLsCs8YwnvP88lUF2Z5qRP28pXBh3ef9Rz

import express, { Request, Response } from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.post('/', (req: Request, res: Response) => {
    res.send({
        data: req.body
    })
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})