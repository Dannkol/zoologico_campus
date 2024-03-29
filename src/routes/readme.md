# API Reference

* Parametros Headers

  | Parameter | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `Authorization` | `string` | **Opcional**. bearer api_key|
  | `accept-version` | `string` | **Required** Version del endpoint.|



# API Reference Auth

#### Post Rquister Version 1.0.0

```http
  POST /auth/registro
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**. Unique|
| `password` | `string` | **Required**. |
| `rol` | `number` | **Required**. rol del usuario 1:invitado, 2:empleado, 3:investigacion, 4:admin |
| `permisos` | `array` | **Required**. permisos de versiones |

Request

* rol empleado 2

```JSON
{
  "nombre":"Ivanchin",
  "password":"prueba",
  "rol":2,
  "permisos":["1.0.0", "^2.0.0"]
}
```

  * rol administrativo 4

  ```JSON
   {
    "nombre": "usuarioAdmin", 
    "password": "password789",
    "rol": 4,
    "permisos": ["1.0.0", "2.0.0"]
  }
  ```
  
  * rol visitante 1

  ```JSON
  {
    "nombre": "UsuarioVisitante",
    "password": "contrasena123",
    "rol": 1,
    "permisos": ["1.0.0", "2.0.0"]
  }
    
  ```

  
  * rol investigativo 3

  ```JSON
  {
    "nombre": "UsuarioInvestigador",
    "password": "clave456",
    "rol": 3,
    "permisos": ["1.0.0", "^2.0.0"]
  }
  ```

#### Post Login Version 1.0.0

```http
  POST /auth/inicioSesion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**.|
| `password` | `string` | **Required**. |

Request

```JSON
{
  "nombre":"Ivanchin",
  "password":"prueba"
}
```

# API Reference Animales

#### Get All admin Animal Version ^2.0.0 y rol 2

```http
  GET /animal/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :---------------------------------|
| `Authorization` | `string` | **Opcional**. bearer api_key |

#### Get public Animal Version 1.0.0 

```http
  GET /animal/
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `/` | `/` | **/**. |

#### post adquicision Animal Version ^2.0.0 y rol 2



| Parameter | Type     | Description                       |
| :-------- | :------- | :---------------------------------|
| `Authorization` | `string` | **Required**. bearer api_key |

```http
  POST /animal
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
  "tipo_adquisicion": "compra",
  "fecha_adquisicion": "2023-08-20",
  "detalles": {
    "descripcion": "Adquisición de un león",
    "animal": {
      "nombre": "Simba",
      "especie": "León",
      "familia": "Felidae",
      "genero": "Panthera",
      "edad": 3,
      "dimensiones": {
        "altura": { "fecha": "2023-08-20", "valor": 120 },
        "peso": { "fecha": "2023-08-20", "valor": 180 }
      },
      "historial_medico": [
        {
          "id_responsable": cambiarIdValido,
          "fecha": "2023-08-20",
          "observacion": "Examen médico inicial"
        }
      ],
      "historial_animal": [
        {
          "id_responsable": cambiarIdValido,
          "fecha": "2023-08-20",
          "observacion": "Registro de llegada al zoológico"
        }
      ],
      "origen": "Cautiverio",
      "estado": 1
    },
    "id_habitad": idHabitatValido
  }
}
```

## Endpoint de baja de animal

| Parameter | Type     | Description                       |
| :-------- | :------- | :---------------------------------|
| `Authorization` | `string` | **Opcional**. bearer api_key |

#### Post baja Animal Fuga Version ^2.0.0

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
  "animal": idAnimalValido,
  "tipo": "0",
  "fecha": "2023-03-12",
  "detalles": {
    "fuga": {
      "lugar": idHabitatValido,
      "estado": "2",
      "acta": {
        "fecha": "2023-03-12",
        "responsables": [
          idPersonalvalido
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

#### Post baja Animal defuncion Version ^2.0.0

```http
  POST /animal/admin/baja/defuncion
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
  "animal": idValidoAnimal,
  "tipo": 2,
  "fecha": "2023-08-18",
  "detalles": {
    "defuncion": {
      "analisis": [
        idAnalisisValido,
        idAnalisisValido
      ],
      "fecha_inhumacion": "2003-10-10T00:00:00"
    }
  }
}
```

#### Post baja Animal donacion Version ^2.0.0

```http
  POST /animal/admin/baja/donacion
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `animal` | `ObjectId` | **Required**. identificador del animal  | 
| `tipo` | `String` | **Required**. defuncion, Donación, Intercambio, Fuga, Robo |
| `fecha` | `Date` | **Opcional**. Fecha de la baja |
| `detalles` | `Object` | **Required**. Detalla la baja |

* Baja por donacion o intercambio

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `carta` | `String` | **Required**. Carta del organismo pidiendo la donacion o intercambio| 
    | `acta` | `Object` | **Required**. Acta legal de la donacion o intercambio |
    | `fecha_translado` | `Date` | **Required**. Fecha translado |
    | `estado`  | `Number` | **Required**. Estado del translado, puede darse el caso que el translado cambie de fecha y el animal siga en el zoo , 1 : Finalizado, 0 : Canselado, 2 : En espera a translado, 3 : Cambio de fecha |
    | `observaciones` | `Array` | **Opcional** Observaciones en el proceso de translado  |

   * tabla de acta

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
  "animal": idAnimalValido,
  "tipo": 2,
  "fecha": "2023-08-18",
  "detalles": {
    "donacion": {
      "carta": "req.detalles.donacion.carta",
      "acta": {
        "fecha": "2023-08-12",
        "origen": "req.detalles.donacion.act.origen",
        "destino": "req.detalles.donacion.act.destino",
        "observaciones": "dasdas",
        "documentacion": {
          "act_del_estado": "req.detalles.donacion.act.documentacion.act_del_estado",
          "doc_legal_origen": "req.detalles.donacion.act.documentacion.doc_legal_origen",
          "doc_legal_destino": "req.detalles.donacion.act.documentacion.doc_legal_destino",
          "docs_responsables": ["req.detalles.donacion.act.documentacion.docs_responsables"]
        }
      },
      "fecha_translado": "2023-08-12",
      "estado": "2",
      "observaciones": [
          {
            "fecha": "2023-08-12",
            "detalle": "dsdsad"
          }
        ]
    }
  }
}
```

# API Reference Visitas


#### Post nueva visita Version 2.0.0 y rol 4

* Ingrese como rol administrativo => POST /auth/inicioSesion Version 1.0.0

  ```JSON
  {
    "nombre": "usuarioAdmin", 
    "password": "password789"
  }
  ```

```http
  POST /visitas/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :---------------------------------|
| `Authorization` | `string` | **Opcional**. bearer api_key |

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `tipo` | `Number` | **Required**.  tipo de visita , 0 : guia_escolar , 1 : investigacion_escolar , 2 :guia_universitaria , 3 : investigacion_universitaria , 4 : recorrido guiado , 5 : evento especial , 6 : general, 7 : investigacion_particular | 
| `nombre_evento` | `String` | **Opcional**. razon de la visista |
| `descripcion` | `String` | **Opcional**. razon de la visista  |
| `detalle` | `Object` | **Required**. informacion de la visita  |
| `investigaciones` | `Array` | **Opcional**. lista de investigaciones  |
| `plan` | `Object` | **Opcional**. Detalles del plan  |
| `precio_total` | `Number` | **Required**. precio total de la visista  |
| `descripcion` | `String` | **Opcional**. Documentos del visitante  |

*  Esquema en tablas basica para detalle

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `institucion` | `Number` | **Opcional**.  nombre de la institucion que viene a la visista, si no aplica dejar null | 
    | `responsables` | `Array` | **Required**.  responsables de la visita |
    | `fecha_fin` | `Date` | **Opcional**. fecha fin del evento  |
    | `fecha_inicio` | `Date` | **Required**. fecha inicio del evento  |
    | `areas` | `Array` | **Opcional**. lista de ObjectId  |
    | `observaciones` | `Array` | **Opcional**. lista de observaciones  |
    | `documentos` | `Object` | **Required**. Documentos del o los visitante/s  |

Request para visita de investigacion

```JSON
{
  "tipo": 0,
  "nombre_evento": "Visita escolar",
  "detalle": {
    "institucion": "Escuela Primaria ABC",
    "responsables": [
      idpersonalValido,
      idpersonalValido
    ],
    "fecha_inicio": "2023-08-01",
    "fecha_fin": "2023-08-02",
    "areas": [
      idHabitatValido,
      "idHabitatValido"
    ],
    "observaciones": [
      {
        "responsable": idpersonalValido,
        "observacion": "Los estudiantes mostraron mucho interés en los animales",
        "fecha": "2023-08-01T10:00:00Z"
      }
    ],
    "documentos": {
      "acta": {
        "fecha": "2023-08-01T00:00:00Z",
        "url": "https://ejemplo.com/acta",
        "doc_legal_institucion": "https://ejemplo.com/doc_legal"
      },
      "doc_visitantes": [
        {
          "nombre": "Estudiante 1",
          "edad": 12,
          "doc_id": "https://ejemplo.com/doc_estudiante1",
          "boleta": {
            "tipo": "escolar",
            "precio_boleta": 10
          },
          "padres": {
            "doc_padres": [
              "https://ejemplo.com/doc_padre1"
            ],
            "permiso": "https://ejemplo.com/permiso_estudiante1"
          },
          "permisos": [
            "https://ejemplo.com/permiso_estudiante1"
          ]
        }
      ]
    }
  },
  "investigaciones": [
    {
      "area": idInvestigacionValida,
      "id_investigacion": [
        "64d1b044068a2499b7107062"
      ],
      "descripcion": "Investigación sobre hábitos alimenticios"
    }
  ],
  "plan": {
    "nombre": "Plan escolar",
    "actividades": [
      "Charla sobre animales",
      "Recorrido por el zoológico"
    ]
  },
  "precio_total": 100,
  "description": "Visita guiada para estudiantes de primaria"
}
```

Request para visita no investigativa

```JSON
{
  "tipo": 6,
  "nombre_evento": "Visita general",
  "detalle": {
    "responsables": ["idPersonalValido"],
    "fecha_inicio": "2023-09-15",
    "documentos": {
      "acta": {
        "fecha": "2023-09-15",
        "url": "https://ejemplo.com/acta2",
        "doc_legal_institucion": "https://ejemplo.com/doc_legal2"
      },
      "doc_visitantes": []
    }
  },
  "investigaciones": [],
  "plan": {},
  "precio_total": 5,
  "description": "Visita abierta al público general"
}
```

#### Get all eventos Version 1.0.0

```http
  POST /visitas/eventos
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `/` | `/` | **/**. |


# API Reference Persona

| Parameter | Type     | Description                       |
| :-------- | :------- | :---------------------------------|
| `Authorization` | `string` | **Requerido**. bearer api_key |

#### GET DE TODAS LAS PERSONAS Version 2.0.0

```http
  GET /personal/
```


#### POST DE TODAS LAS PERSONAS Version 2.0.0

```http
  POST /personal/contratarPersonal
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `nombre` | `string` | **Required**.  | 
| `puesto` | `number` | **Opcional**. 0:empleado, 1:admin, 2:guia, 3:investigador |
| `doc_id` | `String` | **Opcional**. razon de la visista  |
| `experiencia` | `Object` | **Required**.   |
| `habilidades` | `Array` | **Opcional**. lista de habilidades  |
| `arl` | `Object` | **Opcional**. Doc de la arl  |
| `contrato` | `Object` | **Required**. Doc del contrato |
| `habitats_a_cargo` | `array` | **Opcional**. lista referencia de habitas  |
| `estado` | `number` | **Opcional**. Esta activo o no el trabajador  |

* arl

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `eps` | `string` | **Required**. nombre de la aps |
  | `pensiones` | `string` | **Required**.  | 
  | `caja_de_compensacion_familiar` | `string` | **Opcional**. |
  | `contrato` | `string` | **Opcional**. |  
  | `doc_id` | `string` | **Opcional**. |  

* contrato

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `fecha` | `date` | **Required**. fecha del contrato |
  | `url` | `string` | **Required**.  url del contrato | 
  | `sueldo` | `number` | **Opcional**. |


Request

```JSON
{
  "nombre": "Ana Lopez",
  "puesto": 0,
  "doc_id": "url_documento_identidad",
  "experiencia": { "years": 3, "descripcion": "Experiencia en manejo de felinos" },
  "habilidades": ["Cuidado animal", "Alimentación", "Seguridad"],
  "arl": [
    {
      "eps": "SURA",
      "pensiones": "url_pensiones",
      "caja_de_compensacion_familiar": "url_caja_compensacion",
      "contrato": "Indefinido",
      "doc_id": "url_documento_identidad" 
    }
  ],
  "contrato": {
    "fecha": "2023-08-01",
    "url": "url_contrato",
    "sueldo": 1500
  },
  "habitats_a_cargo":["idHabitatValido", "idHabitatValido"],
  "estado": 1
}
```

#### POST DE TODAS LAS PERSONAS Version 2.0.0

```http
  POST /personal/darBajaPersonal
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `personal_id` | `string` | **Required**. id de la persona |
| `motivo` | `string`Motivo de la baja | **Required**.   | 
| `fecha` | `date` | **Opcional**. fecha de la baja |
| `documentacion` | `date` | **Opcional**. lista de url de documentos relacionados |

Request

```JSON
{
  "personal_id": "idValidoPersonal",
  "motivo": "Fallecimiento",
  "fecha": "2023-08-25",
  "tipo": "muerte",
  "documentacion": [
    "url_documento_3",
    "url_documento_4"
  ]
}

```


# API Reference HABITATS

#### GET DE TODAS LOS HABITATS Version ^1.0.0

```http
  GET /habitat
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `/` | `/` | **/**. |

#### GET DE TODAS LOS HABITATS Version ^2.0.0 y rol 2 (empleado)

* Ingrese como rol empleado nuevamente => POST /auth/inicioSesion Version 1.0.0

```JSON
{
  "nombre":"Ivanchin",
  "password":"prueba"
}
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `api_key` | `string` | **Required**. |

```http
  GET /habitat
```

#### POST HABITATS Version ^2.0.0

```http
  GET /habitat/createHabitat
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `api_key` | `string` | **Required**. |
| `nombre` | `string` | **Required**. |
| `tipo_habitat` | `string` | **Required**. |
| `descripcion_ambiente` | `string` | **Required**. |
| `dimensiones` | `object` | **Required**. |
| `refugio_descanso` | `string` | **Required**. |
| `instalaciones_equipos` | `object` | **Required**. |
| `seguridad_barreras` | `string` | **Required**. |
| `notas_observaciones` | `string` | **Required**. |

* dimensiones

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `area` | `number` | **Required**. |
  | `volumen` | `string` | **Required**. |

* caracteristicas_ambientales

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `temperatura_promedio` | `number` | **Required**. |
  | `humedad_relativa` | `number` | **Required**. |
  | `tipo_sustrato` | `string` | **Required**. |
  | `vegetacion` | `string` | **Required**. |

* instalaciones_equipos

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `elementos` | `number` | **Required**. lista de elementos |
  | `equipos` | `string` | **Required**. |

Request

```JSON
{
  "nombre": "Hábitat de Tigres Siberianos",
  "tipo_habitat": "Reserva de Montaña",
  "descripcion_ambiente": "Entorno natural en las montañas para tigres siberianos",
  "dimensiones": { "area": 1000, "volumen": 500 },
  "caracteristicas_ambientales": {
    "temperatura_promedio": -10,
    "humedad_relativa": 80,
    "tipo_sustrato": "Nieve y rocas",
    "vegetacion": "Bosques de coníferas"
  },
  "refugio_descanso": "Cuevas naturales y áreas con sombra de árboles",
  "instalaciones_equipos": {
    "elementos": ["Estanque con peces", "Rocas para trepar", "Plataformas de observación"],
    "equipos": "Sistemas de calefacción y monitoreo de movimiento"
  },
  "seguridad_barreras": "Vallas electrificadas y fosos naturales",
  "notas_observaciones": "Se mantiene un ambiente lo más natural posible para los tigres siberianos"
}
```

# API Reference AREAS_INVESTIGACION

#### GET DE TODAS LAS AREAS_INVESTIGACION Version ^1.0.0 

```http
  GET /investigaciones
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `/` | `/` | **/**. |



#### GET DE TODAS LAS AREAS_INVESTIGACION Version ^2.0.0 y rol 3 

* Ingrese como rol investigador => POST /auth/inicioSesion Version 1.0.0

  ```JSON
  {
    "nombre": "UsuarioInvestigador",
    "password": "clave456"
  }
  ```

  | Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `Authorization` | `string` | **Required**. berar your api_key|


```http
  GET /investigaciones
```

#### POST DE TODAS LAS AREAS_INVESTIGACION Version ^2.0.0

  | Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `Authorization` | `string` | **Required**. berar your api_key|

```http
  POST /investigaciones/createInvestigacion
```

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `api_key` | `string` | **Required**. |
| `area` | `string` | **Required**.             Cuarentena, Morgue, Radiologia, Quirofano, Microbiologia, Botanica, Investigacion general |
| `responsables` | `string` | **Required**. Lista de id los empleados responsables del area |
| `fecha_creacion` | `date` | **Required**. |
| `investigaciones` | `Array` | **Required**. Lista de investigaciones del area|
| `descripcion` | `Array` | **Required**.|

* investigaciones

  | Parametro | Type     |Descripción            |
  | :--------: | :-------: | :------------------------- |
  | `id_investigacion` | `string` | **Required**. ID de la investigación |
  | `responsables` | `array` | **Required**. lista de Responsables de la investigación |
  | `id_animal` | `array` | **Required**. Lista de id los animales participantes en la investigacion |
  | `nombre` | `string` | **Required** Nombre de la investigacion |
  | `fecha_inicio` | `date` | **Required** |
  | `fecha_fin` | `date` | **Required**|
  | `doc` | `array` | **Required** lista de Artículos o documentos publicados por el área de investigación|

  * doc

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `fecha` | `date` | **Required**. |
    | `responsables` | `array` | **Required**. lista de Responsables de la investigación |
    | `id_animal` | `array` | **Required**. Lista de id los animales participantes en la investigacion |
    | `url` | `string` | **Required**. url del doc o articulo |
    | `resumen` | `string` | **Required**. Resumen del nuevo artículo |

Request

```JSON
{
  "area": "Investigacion general",
  "responsables": [
      "64d1b044068a2499b7107064",
      "64d1b044068a2499b7107065"
  ],
  "fecha_creacion": "2023-09-01",
  "investigaciones": [
      {
          "id_investigacion": "64d1b044068a2499b7107066",
          "responsables": [
              "64d1b044068a2499b7107064",
              "64d1b044068a2499b7107064"
          ],
          "id_animal": ["64d1b044068a2499b7107067"],
          "nombre": "Investigación sobre nuevas enfermedades",
          "fecha_inicio": "2022-11-01",
          "fecha_fin": "2023-09-01",
          "doc": [
              {
                  "fecha": "2023-09-01",
                  "responsables": ["64d1b044068a2499b7107068"],
                  "id_animal": ["64d1b044068a2499b7107067"],
                  "url": "nueva_url_articulo",
                  "resumen": "Resumen del nuevo artículo"
              }
          ]
      }
    ],
  "descripcion": "Nueva descripción del área de investigación"
}
```






