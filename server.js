const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://cineland-frontend.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('No permitido por CORS'));
        }
    },
}));
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});