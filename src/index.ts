// resource: https://www.youtube.com/watch?v=QqHaDrsj8VA&list=PLsCs8YwnvP88lUF2Z5qRP28pXBh3ef9Rz

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})