import express from 'express';
import { errorHandler } from "./utils/errorHandler.js";
import router from "./routes/index.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Scooter Rental API is running.');
});

app.use("/api", router);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}

export default app;