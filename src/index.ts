import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register every request
app.use((req: Request, res: Response, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

app.get('/status', (req: Request, res: Response) => {
  res.send({ damaged_system: "navigation" });
});

app.get('/repair-bay', (req: Request, res: Response) => {

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

app.post('/phase-change-diagram', (req: Request, res: Response) => {

  const pressure = req.query.pressure && typeof req.query.pressure === 'string' ? parseFloat(req.query.pressure) : null;

  if (pressure === null || isNaN(pressure)) {
    res.status(400).send({ error: 'Invalid or missing pressure parameter' });
    return;
  }
  
  // Get pressure from request query parameters
  const LIQUID_CONSTANT = -4.214285714285714;
  const LIQUID_SLOPE = 4061.224489795918;

  const LIQUID_VOLUME =  (pressure - LIQUID_CONSTANT) / LIQUID_SLOPE;

  // Round 4 decimal places
  const roundedLiquidVolume = Math.round(LIQUID_VOLUME * 10000) / 10000;

  const VAPOR_CONSTANT = 10.00116096877969;
  const VAPOR_SLOPE = -0.3317053656259897;

  const VAPOR_VOLUME = (pressure - VAPOR_CONSTANT) / VAPOR_SLOPE;

  // Round 4 decimal places
  const roundedVaporVolume = Math.round(VAPOR_VOLUME * 10000) / 10000;

  res.send({
    specific_volume_liquid: roundedLiquidVolume,
    specific_volume_vapor: roundedVaporVolume
  });
});

app.post('/teapot', (req: Request, res: Response) => {

  res.status(418).send("I'm a teapot");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
