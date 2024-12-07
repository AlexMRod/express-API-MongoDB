import express from 'express';
import 'dotenv/config';
import './config/db.js'; // Initialize database connection
import songsRoutes from './routes/songs.js';

const app = express();

const {
    PORT = 3333
} = process.env;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/api/v1/songs', songsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
