"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get('/status', (req, res) => {
    res.send({ damaged_system: "navigation" });
});
app.get('/repair-bay', (req, res) => {
    // Send html
    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>\n');
    res.write('<html>\n');
    res.write('<head>\n');
    res.write('    <title>Repair</title>\n');
    res.write('</head>\n');
    res.write('<body>\n');
    res.write('    <div class="anchor-point">NAV-01</div>\n');
    res.write('</body>\n');
    res.write('</html>\n');
    res.send();
});
//Tercera Llamada: POST /teapot
// Retorna un código de estado HTTP 418 (I'm a teapot).
app.post('/teapot', (req, res) => {
    res.status(418).send("I'm a teapot");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
