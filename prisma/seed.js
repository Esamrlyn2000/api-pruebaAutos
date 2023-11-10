const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
await prisma.Auto.create({
    data: {
      nombre: "Clio",
      marca: "Renault",
      puertas: 5,
      color: "Rojo",
      fotos: ["https://cdn.pixabay.com/photo/2016/12/03/18/57/amg-1880381_960_720.jpg"],
      anio: 2018,
    },
});
await prisma.Auto.create({
    data: {
      nombre: "Gol",
      marca: "Volkswagen",
      puertas: 5,
      color: "Blanco",
      fotos: ["https://cdn.pixabay.com/photo/2016/12/03/18/57/amg-1880381_960_720.jpg"],
      anio: 2018,
    },
});
await prisma.Auto.create({
    data: {
      nombre: "Clio",
      marca: "Renault",
      puertas: 5,
      color: "Rojo",
      fotos: ["https://cdn.pixabay.com/photo/2016/12/03/18/57/amg-1880381_960_720.jpg"],
      anio: 2018,
    },
});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });