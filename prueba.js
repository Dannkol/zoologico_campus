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
        nombre: "Ana Lopez",
        puesto: "Cuidador de animales",
        doc_id: "url_documento_identidad",
        experiencia: {
          years: 3,
          descripcion: "Experiencia en manejo de felinos",
        },
        habilidades: ["Cuidado animal", "Alimentación", "Seguridad"],
        arl: [
          {
            eps: "SURA",
            pensiones: "url_pensiones",
            caja_de_compensacion_familiar: "url_caja_compensacion",
            contrato: "Indefinido",
            doc_id: "url_documento_identidad", // Reemplaza con la URL válida
          },
        ],
        contrato: {
          fecha: new Date("2023-08-01"),
          url: "url_contrato",
          sueldo: 1500,
        },
        observaciones: [],
        estado: 1,
      },
      {
        nombre: "Carlos Ramirez",
        puesto: "Veterinario",
        doc_id: "url_documento_identidad",
        experiencia: {
          years: 8,
          descripcion: "Especializado en fauna exótica",
        },
        habilidades: ["Diagnóstico médico", "Cirugía", "Tratamientos"],
        arl: [],
        contrato: {
          fecha: new Date("2023-07-15"),
          url: "url_contrato",
          sueldo: 2500,
        },
        observaciones: [],
        estado: 1,
      },
    ];

    const result = await db.collection("personal").insertMany(query);
    console.log("Documentos insertados:", result.insertedCount);
  } catch (error) {
    console.error(
      "Error:",
      error
    );
  } finally {
    client.close();
  }
})();
