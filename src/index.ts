import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
