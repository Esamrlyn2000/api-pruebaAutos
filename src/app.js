const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS
? process.env.ALLOWED_ORIGINS.split(",")
: [];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

// Obtener todos los autos
app.get('/autos', async (req, res) => {
  console.log('entro')
  const autos = await prisma.auto.findMany();
  res.json(autos);
});

// Obtener un auto por ID
app.get('/autos/:id', async (req, res) => {
  const { id } = req.params;
  const auto = await prisma.auto.findUnique({
    where: { id: parseInt(id) },
  });

  if (auto) {
    res.json(auto);
  } else {
    res.status(404).json({ error: 'Auto no encontrado' });
  }
});

// Crear un nuevo auto
app.post('/autos', async (req, res) => {
  const { nombre, marca, puertas, color, fotos, anio } = req.body;
  const nuevoAuto = await prisma.auto.create({
    data: { 
      nombre, 
      marca, 
      puertas: parseInt(puertas), 
      color, 
      fotos, 
      anio: parseInt(anio) 
    },
  });
  res.json(nuevoAuto);
});

// Actualizar un auto por ID
app.put('/autos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, marca, puertas, color, fotos, anio } = req.body;

  const autoActualizado = await prisma.auto.update({
    where: { id: parseInt(id) },
    data: { nombre, marca, puertas, color, fotos, anio },
  });

  res.json(autoActualizado);
});

// Eliminar un auto por ID
app.delete('/autos/:id', async (req, res) => {
  const { id } = req.params;
  const autoEliminado = await prisma.auto.delete({
    where: { id: parseInt(id) },
  });

  res.json(autoEliminado);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
