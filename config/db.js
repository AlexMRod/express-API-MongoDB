import mongoose from 'mongoose';

const {
    MONGODB_URI = "mongodb://localhost:27017/c18"
} = process.env;

(async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
        
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
})();
