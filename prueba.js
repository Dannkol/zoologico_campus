import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Dannkol:diminombre12A@pruebas.ncnxgtj.mongodb.net/"; // Cambia la URI de acuerdo a tu configuración
const dbName = "db_zoo_campus";

(async () => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);

    const query = [
      {
        titulo: 'Concierto de Rock',
        descripcion: 'Un emocionante concierto de rock con bandas locales.',
        fecha: new Date('2023-09-15'),
        precio: 25.99
      },
      {
        titulo: 'Taller de Arte',
        descripcion: 'Un taller de arte interactivo para niños y adultos.',
        fecha: new Date('2023-09-20'),
        precio: 10.52
      },
      {
        titulo: 'Feria de Comida',
        descripcion: 'Una feria gastronómica con los mejores platillos de la región.',
        fecha: new Date('2023-10-05'),
        precio: 5.75
      }
    ];

    const result = await db.collection("habitat").find({}, {}).toArray();

    console.log(result);

  } catch (error) {
    console.error(
      "Error:",
      error.writeErrors[0].err.errInfo.details.schemaRulesNotSatisfied[0].specifiedAs.r
    );
  } finally {
    client.close();
  }
})();
