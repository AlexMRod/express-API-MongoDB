import 'dotenv/config'
import express from "express"

const app = express();
const { PORT = 3333 } = process.env;

  // functionality
app.use(express.static('../public'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

// V1 reoutes and controllers
import songRoutes from './v1/routes/song.routes.js';
app.use('/api/v1', songRoutes)
// app.use('api/v2' ...)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});