# API Reference Animales

#### Get All admin Animal

```http
  GET /animal/admin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### post adquicision Animal

```http
  POST /animal
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/`      | `/` | **/**. |

```http
  POST /equipo/admin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `tipo_adquisicion` | `string` | **Required**. |
| `fecha_adquisicion` | `string` | **Required**. |
| `detalles` | `object` | **Required**. |

* detalles

| Parametro | Type     | Descripción                |
| :--------: | :-------: | :------------------------- |
| `nombre` | `String` | **Required**. Nombre del animal |
| `especie` | `String` | **Opcional**. Especie del animal |
| `familia` | `String` | **Opcional**. Familia del animal|
| `genero` | `String` | **Opcional**. Genero del animal |
| `edad`   | `String` | **Opcional**. Edad del animal |
| `altura` | `Array` | **Required**. Altura del animal en cm |
| `peso` | `Array` | **Required**. peso del animal en kg |
| `historial_medico` | `Array` | **Opcional**. historial medico del animal|
| `historial_animal` | `Array` | **Opcional**. historial del animal |
| `origen` | `String` | **Opcional**. Origen del animal |
| `estado` | `Number` | **Required**. Estado del animal |

#### altura y peso 
    
| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `fecha` | `Date` | **Required**. Fecha del la toma  |
| `valor` | `Number` | **Required**. Valor de la toma |

#### historiales

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `id_responsable` | `ObjectId` | **Required**. Refencia al responsable  |
| `fecha` | `Date` | **Required**. |
| `observacion` | `string` | **Required** Descripción del historila|
| `id_investigacion` | `ObjectId` | **Opcional** Solo para medico, refiere a la investigacion medica realizada |

Request

```json
{
  tipo_adquisicion: "Compra",
  fecha_adquisicion: "2023-08-20",
  detalles: {
    descripcion: "Adquisición de un león",
    animal: {
      nombre: "Simba",
      especie: "León",
      familia: "Felidae",
      genero: "Panthera",
      edad: 3,
      dimensiones: {
        altura: { fecha: "2023-08-20", valor: 120 },
        peso: { fecha: "2023-08-20", valor: 180 },
      },
      historial_medico: [
        {
          id_responsable: empleado2,
          fecha: "2023-08-20",
          observacion: "Examen médico inicial",
        },
      ],
      historial_animal: [
        {
          id_responsable: ObjectId,
          fecha: "2023-08-20",
          observacion: "Registro de llegada al zoológico",
        },
      ],
      origen: "Cautiverio",
      estado: 1,
    },
    id_habitad: ObjectId
  }
}
```

## Endpoint de baja de animal

#### Post baja Animal Fuga

```http
  POST /animal/admin/baja/fuga
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `animal` | `ObjectId` | **Required**. identificador del animal  | 
| `tipo` | `String` | **Required**. defuncion, Donación, Intercambio, Fuga, Robo |
| `fecha` | `Date` | **Opcional**. Fecha de la baja |
| `detalles` | `Object` | **Required**. Detalla la baja |

* Detalles

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `carta` | `String` | **Required**. Carta del organismo pidiendo la donacion o intercambio| 
    | `acta` | `Object` | **Required**. Acta legal de la donacion o intercambio |
    | `fecha_translado` | `Date` | **Required**. Fecha translado |
    | `estado`  | `Number` | **Required**. Estado del translado, puede darse el caso que el translado cambie de fecha y el animal siga en el zoo , 1 : Finalizado, 0 : Canselado, 2 : En espera a translado, 3 : Cambio de fecha |
    | `observaciones` | `Array` | **Opcional** Observaciones en el proceso de translado  |

* acta

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `fecha` | `Date` | **Required**. Fecha del acta | 
    | `origen` | `String` | **Required**. nombre del donante o origen |
    | `destino` | `String` | **Required**. nombre del donatario , si el donatario es el mismo zoo entonces es una donacion |
    | `observaciones`  | `String` | **Opcional**. observaciones a tener en cuenta |
    | `documentacion` | `Array` | **Required** urls de los documentacion anexados al acta  |
    | `act_del_estado` | `String` | **Required** |
    | `doc_legal_origen`  | `String` | **Required** |
    | `doc_legal_destino`   | `String` | **Required** |
    | `docs_responsables` | `String` | **Required** |

Request

```json
{
  "animal": "64e977165c79c2c2a0792952",
  "tipo": "0",
  "fecha": "2023-03-12",
  "detalles": {
    "fuga": {
      "lugar": "64e9749fabecf5d8f35f2086",
      "estado": "2",
      "acta": {
        "fecha": "2023-03-12",
        "responsables": [
          "64e976e27813506a7af9f705"
        ],
        "documentacion": {
          "doc_reporte_autoridades": "URL",
          "doc_legal_zoo": "URL",
          "informe_opinion_publica": "URL"
        },
        "observaciones": [
          {
            "fecha": "2023-08-12",
            "detalle": "dsdsad"
          }
        ]
      }
    }
  }
}
```

#### Post baja Animal defuncion

```http
  POST /animal/admin/baja/fuga
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `animal` | `ObjectId` | **Required**. identificador del animal  | 
| `tipo` | `String` | **Required**. defuncion, Donación, Intercambio, Fuga, Robo |
| `fecha` | `Date` | **Opcional**. Fecha de la baja |
| `detalles` | `Object` | **Required**. Detalla la baja |

* Baja por defuncion

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `analisis` | `Array` | **Required**. investigaciones realizadas ObjectId de las investigaciones | 
    | `fecha_inhumacion` | `Date` | **Required**. Fecha de la inhumacion del cadaver no debe pasar de los 6 meses luego de la fecha de muerte |

```json
{
  "animal": "64e9c4b2986703ce048da465",
  "tipo": 2,
  "fecha": "2023-08-18",
  "detalles": {
    "defuncion": {
      "analisis": [
        "64ed512750945d36d8b17caf",
        "64ed512750945d36d8b17cb0"
      ],
      "fecha_inhumacion": "2003-10-10T00:00:00"
    }
  }
}
```

#### Post baja Animal donacion o traslado

```http
  POST /animal/admin/baja/fuga
```