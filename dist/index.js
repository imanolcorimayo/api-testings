"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Register every request
app.use((req, res, next) => {
    console.log(`New request: ${req.method} ${req.url}`);
    next();
});
app.get('/status', (req, res) => {
    res.send({ damaged_system: "navigation" });
});
app.get('/repair-bay', (req, res) => {
    // Send html
    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Repair</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<div class="anchor-point">NAV-01</div>');
    res.write('</body>');
    res.write('</html>');
    res.send();
});
//Tercera Llamada: POST /teapot
// Retorna un código de estado HTTP 418 (I'm a teapot).
app.post('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot");
});
app.post('/phase-change-diagram', (req, res) => {
    // Check if query are provided
    if (!req.query.pressure) {
        return res.status(400).send('Pressure query parameter is required');
    }
    // Get pressure from request query parameters
    const pressure = parseFloat(req.query.pressure);
    if (isNaN(pressure)) {
        return res.status(400).send('Invalid pressure value');
    }
    const LIQUID_CONSTANT = -4.21428;
    const LIQUID_SLOPE = 4061.22448;
    const LIQUID_VOLUME = (pressure - LIQUID_CONSTANT) / LIQUID_SLOPE;
    const VAPOR_CONSTANT = -4.21428;
    const VAPOR_SLOPE = 4061.22448;
    const VAPOR_VOLUME = (pressure - VAPOR_CONSTANT) / VAPOR_SLOPE;
    res.send({
        specific_volume_liquid: LIQUID_VOLUME,
        specific_volume_vapor: VAPOR_VOLUME
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
