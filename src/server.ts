// server.ts
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

dotenv.config();

const app = express();

// Middleware voor JSON-parsing
app.use(express.json());

// Routes voor evenementen
app.use('/events', eventRoutes);

// Swagger-documentatie beschikbaar maken op /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404-handler voor niet-bestaande routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route niet gevonden' });
});

// Globale error-handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Interne serverfout' });
});

// Configuratie via environment-variabelen
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventsdb';

// Verbinden met MongoDB en starten van de server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));
  })
  .catch((error) => {
    console.error('Fout bij verbinden met MongoDB:', error);
  });
