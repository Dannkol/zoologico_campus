
# Documentacion de la base de datos

Esquematizacion de la base de datos 


# COLECCION ANIMAL

La collecion de animal refiere a la forma como se guarda al animal en la base de datos esta para ser explicada se divide en dos primero el animal como tal y luego su adquiscion estas dos se unen para crear el documento de animal en la base de datos

<a name="animal"></a>
## Animal

### Esquema en tablas

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


### Esquema en documento

```js
{
    "nombre" : "...",
    "especie" : "Felino",
    "familia" : "Felix",
    "genero" : "Masculino",
    "edad" : 5,
    "altura" : [
        {
            "fecha" : ISODate("2003-10-10T00:00:00"),
            "valor" : 12
        }
    ], 
    "peso" : [
        {
            "fecha" : ISODate("2003-10-10T00:00:00"),
            "valor" : 12
        }
    ], 
    "historial_medico" : [
        {
            "id_responsable" : ObjectId("64d1b044068a2499b7107060"),
            "fecha" : ISODate("2003-10-10T00:00:00"),
            "observacion" : "...",
            "id_investigacion" :  ObjectId("64d1b044068a2499b7107060")
        }
    ],
    "historial_animal" : [
        {
            "id_responsable": ObjectId("64d1b044068a2499b7107060"),
            "fecha" : ISODate("2003-10-10T00:00:00"),
            "observacion" : "..."
        }
    ],
    "origen" : "africa",
    "estado" : 1 
}
```


## Adquisicion

### Esquema en tablas

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `animal_id` | `ObjectId` | **Required**. Identificador del animal  |
| `tipo_adquision` | `String` | **Opcional**. Tipo de adqusicion |
| `fecha_adquision` | `Date` | **Required**. Fecha de adquision |
| `detalles`  | `Array` | **Required**. Detalles del animal y adquision |

#### Detalles 

* Detalles del origen

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `nombre` | `String` | **Opcional**. Nombre del origen del animal  |
    | `descripcion` | `String` | **Opcional**. descripcion del origen del animal  |


* Animal

    * En este campo se usara [animal](#animal) explicado anterior mente

* Habitas : Id referente al habitat




### Esquema en documento

```js
{
    "animal_id" : ObjectId("64d1b044068a2499b7107060"), 
  "tipo_adquision": "donacion",
  "fecha_adquision": ISODate("2003-10-10T00:00:00") ,
  "detalles": {
    "origen": {
      "nombre" : "Gobierno de china",
      "descripcion" : "..."
    },
    "animal" : {
        // este campo se usara como colección del animal
    }, 
    "habitat" : ObjectId("64d1b044068a2499b7107060"),
    {
        "id_habitat" :  
        "nombre": "Savana",
        "descripcion": "Amplia area con pastizales...",
        "instalaciones": [
            {
                "nombre" : "columpio",
                "descripcion" : "le faltal las cuerdas"
            }
        ] 
    } 
  }
}
```

### Esquema completo de animal en la base de datos


```jS
{
    "_id" : ObjectId("64d1b044068a2499b7107060") , 
    "tipo_adquision": "donacion",
    "fecha_adquision": ISODate("2003-10-10T00:00:00") ,
    "detalles": {
        "origen":{
            "nombre" : "Gobierno de china",
            "descripcion" : "..."
        },
    }

      {
        "nombre" : "...",
        "especie" : "Felino",
        "familia" : "Felix",
        "genero" : "Masculino",
        "edad" : 5,
        "altura" : [
            {
                "fecha" : ISODate("2003-10-10T00:00:00") ,
                "valor" : 12
            }
        ], 
        "peso" : [
            {
                "fecha" : ISODate("2003-10-10T00:00:00") ,
                "valor" : 12
            }
        ], 
        "historial_medico" : [
            {
                "id_responsable" : ObjectId("64d1b044068a2499b7107060"),
                "fecha" : ISODate("2003-10-10T00:00:00"),
                "observacion" : "...",
                "id_investigacion" : ObjectId("64d1b044068a2499b7107060")
            }
        ],
        "historial_animal" : [
            {
                "id_responsable": ObjectId("64d1b044068a2499b7107060"),
                "fecha" : ISODate("2003-10-10T00:00:00") ,
                "observacion" : "..."
            }
        ],
        "origen" : "africa",
        "estado" : 1 
      }, 
      {
        "id_habitat" :  ObjectId("64d1b044068a2499b7107060"), 
        "nombre": "Savana",
        "descripcion": "Amplia area con pastizales...","instalaciones": [
          {
              "nombre" : "columpio",
              "descripcion" : "le faltal las cuerdas"
          }
        ] 
      } 
    ]
}
```

# COLECCION BAJAS ANIMALES

Este es la representacion de una baja en la base de datos, dependiendo del tipo de baja el esquema cambia

## General


### Esquema en tablas

#### Estructura basica

* Tabla de la Estructura basica

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `animal_id` | `ObjectId` | **Required**. identificador del animal  | 
    | `tipo_baja` | `String` | **Required**. defuncion, Donación, Intercambio, Fuga, Robo |
    | `fecha_baja` | `Date` | **Opcional**. Fecha de la baja |
    | `detalles` | `Object` | **Required**. Detalla la baja |
    
    * Esquema en documento
        ```js
        {
            "animal_id": ObjectId("..."), 
            "tipo_baja": "defuncion", 
            "fecha_baja": ISODate("2023-08-18"),
            "detalles": {
                // Detalla la baja
            }
        }
        ```


#### Detalles

* Baja por defuncion

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `analisis` | `Array` | **Required**. investigaciones realizadas ObjectId de las investigaciones | 
    | `fecha_inhumacion` | `Date` | **Required**. Fecha de la inhumacion del cadaver no debe pasar de los 6 meses luego de la fecha de muerte |

    * Esquema en documento

        ```js
        {
            "analisis" : [
                ObjectId("64d1b044068a2499b7107060"),
                ObjectId("66d1b0444335a299b7107060")
            ] , 
            "fecha_inhumacion" : ISODate("2003-10-10T00:00:00") 
        }   
        ```
    * Esquema en documento  Baja por defuncion

        ```js
        {
            "animal_id": ObjectId("..."), 
            "tipo_baja": "defuncion", 
            "fecha_baja": ISODate("2023-08-18"),
            "detalles":  {
                "defuncion" : {
                    "analisis" : [
                        ObjectId("64d1b044068a2499b7107060"),
                        ObjectId("66d1b0444335a299b7107060")
                    ], 
                    "fecha_inhumacion" : ISODate("2003-10-10T00:00:00")
                }
            }  
        }
        ```

* Baja por donacion o intercambio

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `carta` | `String` | **Required**. Carta del organismo pidiendo la donacion o intercambio| 
    | `acta` | `Object` | **Required**. Acta legal de la donacion o intercambio |
    | `fecha_translado` | `Date` | **Required**. Fecha translado |
    | `estado`  | `Number` | **Required**. Estado del translado, puede darse el caso que el translado cambie de fecha y el animal siga en el zoo , 1 : Finalizado, 0 : Canselado, 2 : En espera a translado, 3 : Cambio de fecha |
    | `observaciones` | `Array` | **Opcional** Observaciones en el proceso de translado  |

    * Esquema en documento base

        ```js
        {
            "carta" : "...", 
            "acta" : {}, 
            "fecha_translado" : ISODate(), // Fecha del translado
            "estado" : 1, // Estado del translado, puede darse el caso que el translado cambie de fecha y el animal siga en el zoo 
            // 1 : Finalizado
            // 0 : Canselado
            // 2 : En espera a translado
            // 3 : Cambio de fecha
            "observaciones" : [
                {
                    "fecha" : ISODate(),
                    "detalle" : "..."
                }
            ] // lista de observaciones sobre el proceso de translado
        }
        ```


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


    * Esquema en documento acta
        
        ```js
        {
            "fecha" : ISODate(), // Fecha del acta
            "origen" : "...", //nombre del donante
            "destino" : "...", //nombre del donatario , si el donatario es el mismo zoo entonces es una donacion 
            "observaciones" : "...", //observaciones a tener en cuenta
            "documentacion" : {
                "act_del_estado" : url,
                "doc_legal_origen" : url,
                "doc_legal_destino" : url,
                "docs_responsables" : [... url]
            } // urls de los documentacion anexados al acta
        }
        ```
    * Esquema en documento completo baja por donacion o intercambio

        ```js
        {
            "animal_id": ObjectId("..."), 
            "tipo_baja": "donacion", 
            "fecha_baja": ISODate("2023-08-18"),
            "detalles": {
                "carta" : "...", 
                "acta" : {
                    "fecha" : ISODate(),
                    "origen" : "...",
                    "destino" : "...", 
                    "observaciones" : "...", 
                    "documentacion" : {
                        "act_del_estado" : url,
                        "doc_legal_origen" : url,
                        "doc_legal_destino" : url,
                        "docs_responsables" : [... url]
                    } 
                }, 
                "fecha_translado" : ISODate(), 
                "estado" : 1, 
                "observaciones" : [
                    {
                        "fecha" : ISODate(),
                        "detalle" : "..."
                    }
                ] 
            }
        }
        ```

* Bajas por fuga o robo

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `lugar` | `ObjectId` | **Required**. Referencia al habitat donde sucedio la fuga| 
    | `acta` | `Object` | **Required**. Acta legal de la fuga o robo |
    | `estado`  | `Number` | **Required**. 1 : encontrado , 0 : no encontrado, 2 : en busqueda |

    * Esquema en documento base


        ```js
        {
            "lugar" : ObjectId(), // Referencia al habitat donde sucedio la fuga,
            "estado" : 1 , // 1 : encontrado , 0 : no encontrado, 2 : en busqueda
            "acta" : {
                // Acta legal de la fuga o robo
            }
        }
        ```

    * tabla para acta

        | Parametro | Type     |Descripción            |
        | :--------: | :-------: | :------------------------- |
        | `fecha` | `Date` | **Required**. Fecha del acta | 
        | `responsables` | `Array` | **Required**. id Referencia de los responsables del lugar de la fuga |
        | `observaciones`  | `Array` | **Opcional**. observaciones a tener en cuenta |
        | `documentacion` | `Array` | **Required** urls de los documentacion anexados al acta  |
        | `doc_reporte_acturidades` | `String` | **Required** |
        | `doc_legal_zoo`  | `String` | **Required** |
        | `informe_opinion_publica`   | `String` | **Required** |

        * Esquema en documento acta

            ```js
            {
                "fecha" : ISODate(), // fecha del repote de la fuga
                "responsables" : [ObjectId(),ObjectId()] // id Referencia de los responsables del habitat
                "documentacion" : {
                    "doc_reporte_acturidades" : url, // Url del reporte a las autoridades
                    "doc_legal_zoo" : url, // Url la documentacion legal del zoologico
                    "informe_opinion_publica" : url, // documento enviado a la opinion publica
                },
                "observaciones" : [
                    {
                     "id_testimonio" : ObjectId() , // id Referencia a la persona que realiza la observacion, null es igual a anonimo 
                    "observacion" : "..." , // observacion
                    "fecha" : "..." // fecha de la observacion
                    }
                ]
            }
            ```
    * Esquema en documento completo para Bajas por fuga o robo

    ```js
    {
        "animal_id": ObjectId("..."), 
        "tipo_baja": "fuga", 
        "fecha_baja": ISODate("2023-08-18"),
        "detalles":  {
            "lugar" : ObjectId(), 
            "estado" : 1 , 
            "acta" : {
                "fecha" : ISODate(), 
                "responsables" : [ObjectId(),ObjectId()] 
                "documentacion" : {
                    "doc_reporte_acturidades" : url, 
                    "doc_legal_zoo" : url, 
                    "informe_opinion_publica" : url,
                },
                "observaciones" : [
                    {
                     "id_testimonio" : ObjectId() , 
                    "observacion" : "..." , 
                    "fecha" : "..." 
                    }
                ]
            }
        }
    }
    ```



# COLLECCION DE ALTAS Y BAJAS (historial de movimientosito de animales)

Normalmento un zoologico tiene mucha rotacion de animales, como se muestra en los puntos anteriores, por eso es bueno llevar un histotrial mas claro solo para el movimiento de los animales

### Esquema en tablas

| Parametro | Type     |Descripción            |
| :--------: | :-------: | :------------------------- |
| `fecha` | `Date` | **Required**. Fecha del acta | 
| `responsables` | `Array` | **Required**. id Referencia de los responsables del lugar del movimiento |
| `detalles` | `Array` | **Required**. detalles del movimiento |

#### detalles

En el caso de translados, baja o adquisicon se pegara tal caul en el campo detalles

para cambio de habitat se registrara el habitat anterio y el habitat nuevo

* Tabla para cambio de habitat

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `habitat` | `Object` | **Required**.  | 
    | `origen` | `Array` | **Required**. habitat de origen |
    | `destino` | `Array` | **Required**. habitat de destino |

    * Esquema en documento para cambio de habitat Opcional
        ```js
        {
            "habitat": {
                "origen": "...",
                "destino": "..."
            }
        }
        ```
* Esquema en documento para historial

```js
"fecha" = Date(), // Fecha del movimiento
"responsables"  = [... ObjectId()], // Lista de ID de los responsables
"detalles" = {

    "movimiento" : ObjectId()

    // En caso de adquisicion, trasladado , baja
    // Se copia todo el documento aqui

    // Para cambio de habitat solo se crea un objeto habitat
    // con los cambios origen y destino

    
    // Detalles del tipo de movimiento
    "habitat": {
        "origen": "...",
        "destino": "..."
    } 
} 
```



# COLECCION INVENSTIGACION

Esta coleccion refiere a como se van a guardar y manejar las investigaciones en la base de datos

dependiendo del area esta puede tener varias investigaciones las areas son

* Areas
    * Cuarentena
    * Morgue
    * Radiologia
    * Quirofano
    * Microbiologia
    * Botanica
    * Palentologia
    * Investigacion general

### Tabla general

* Esquema en tablas basica

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `area` | `String` | **Required**.  | 
    | `responsables` | `Array` | **Required**. Responsables del area |
    | `fecha_creacion` | `Date` | **Required**. Fecha de creacion del area |
    | `investigaciones` | `Array` | **Opcional**. Lita de investigaciones en curso |
    | `descripcion` | `String` | **Opcional**. descripcion del area |


    * Esquema en documento base

        ```js
        {
            "area" : "Cuarentena", // Area de investigacion Cuarentena, morgue, radiologia, quirofano, microbiologia, botanica, palentologia ,investigacion_general
            "responsables" : [...ObjectId()], // Responsables del area
            "fecha_creacion" : ISODate(), // Fecha de creacion del area
            "investigaciones" : [], // Lita de investigaciones en curso
            "descripcion" : "..." // descripcion del area
        }
        ```

#### Investigacions

* Esquema en tablas para investigacion

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `id_investigacion` | `ObjectId` | **Required**. ID de la investigacion | 
    | `responsables` | `Array` | **Required**. Responsables del area |
    | `id_animal` | `Array` | **Required**. Id refentes a animales que participaron en la investigacion |
    | `nombre` | `String` | **Opcional**. Nombre de la INVENSTIGACION |
    | `fecha_inico` | `Date` | **Required**. Fecha de inicio de la investigacion |
    | `fecha_fin` | `Date` | **Opcional**. Fecha de fin de la investigacion |
    | `doc` | `Array` | **Opcional**. Articulo o documentos publicados por el area de investigacion |
    | `fecha` | `Date` | **Opcional**. Fecha de publicacion del articulo |
    | `url` | `String` | **Opcional**. URL del articulo |
    | `resumen` | `String` | **Opcional**. resumen del articulo |

    * Esquema en documento invetigacion

        ```js
        [
            {
                "id_investigacion" : ObjectId(), //ID de la investigacion
                "responsables" : [...Object()], // Responsables de la inventario
                "id_animal" : [...Object()], // Id refentes a animales que participaron en la investigacion
                "nombre" : "...", // Nombre de la INVENSTIGACION
                "fecha_inico" : ISODate() , // Fecha de inicio de la investigacion
                "fecha_fin" : ISODate() , // Fecha de fin de la INVENSTIGACION
                "doc" : [
                    {
                        "fecha" : ISODate() , // Fecha de publicacion del articulo
                        "responsables" : [... ObjectId()] , // Ide de los responsables del articulo
                        "id_animal" : [... ObjectId()] , // id_refetente a los animales que participaron en la investigacion
                        "url" : url , // URL del articulo
                        "resumen" : "..." // resumen del articulo
                    }
                ] // articulo o documentos publicados por el area de investigacion
            }
        ],
        ```

#### Esquema en documento COLECCION INVENSTIGACION completo

```js
{
    "area" : "Cuarentena", // Area de investigacion Cuarentena, morgue, radiologia, quirofano, microbiologia, botanica, palentologia ,investigacion_general
    "responsables" : [...ObjectId()], // Responsables del area
    "fecha_creacion" : ISODate(), // Fecha de creacion del area
    "investigaciones" : [
        {
            "id_investigacion" : ObjectId(), //ID de la investigacion
            "responsables" : [...Object()], // Responsables de la inventario
            "id_animal" : [...Object()], // Id refentes a animales que participaron en la investigacion
            "nombre" : "...", // Nombre de la INVENSTIGACION
            "fecha_inico" : ISODate() , // Fecha de inicio de la investigacion
            "fecha_fin" : ISODate() , // Fecha de fin de la INVENSTIGACION
            "doc" : [
                {
                    "fecha" : ISODate() , // Fecha de publicacion del articulo
                    "responsables" : [... ObjectId()] , // Ide de los responsables del articulo
                    "id_animal" : [... ObjectId()] , // id_refetente a los animales que participaron en la investigacion
                    "url" : url , // URL del articulo
                    "resumen" : "..." // resumen del articulo
                }
            ] // articulo o documentos publicados por el area de investigacion
        }
        ], // Lita de investigaciones en curso
    "descripcion" : "..." // descripcion del area
}
```

# COLECCION PERSONAL


Hace referencia a la visualizacion de la coleccion personal en la base de datos


## Tabla general

* Esquema en tablas basica

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `nombre` | `String` | **Required**. nombre empleado | 
    | `puesto` | `String` | **Required**. puesto del empleado |
    | `doc_id` | `String` | **Required**. url del archivo  |
    | `experiencia` | `Object` | **Opcional**. |
    | `habilidades` | `Array` | **Opcional**. lista de habilidades |
    | `responsable` | `Array` | **Opcional**. lista de id refentes a las ares que es responsable, no aplica a puestos administrativos |
    | `arl` | `Array` | **Required**. lista de historial de documentacion para la arl |
    | `contrato` | `Object` | **Required**. Informacion del contrato |
    | `observaciones` | `Array` | **Opcional**. lista de observaciones realizadas al empleado |
    | `estado` | `number` | **Required**. estado |


### arl

* Esquema en tablas arl

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `eps` | `String` | **Required**. url Certificación de afiliación a la EPS como cotizante | 
    | `pensiones` | `String` | **Required**. url Certificación de afiliación a Fondo de Pensiones. |
    | `caja_de_compensación_familiar` | `String` | **Required**. url Certificación de afiliación a Caja de Compensación Familiar. Con nombre del empleador actual.  |
    | `contrato` | `String` | **Required**. url del contrato |
    | `doc_id` | `String` | **Required**. url del documento de identidad de la persona |

* Esquema en documento arl

    ```js
    {
        eps: url , // Certificación de afiliación a la EPS como cotizante
        pensiones: url , // Certificación de afiliación a Fondo de Pensiones.
        caja_de_compensacion_familiar: url , // Certificación de afiliación a Caja de Compensación Familiar. Con nombre del empleador actual.
        contrato: url , // Contratolaboral
        doc_id: url , // Copia de documento de identidad
    }
    ```
### contrato 

* Esquema en tablas contrato

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `fecha` | `Date` | **Required**.  Fecha firma del contrato | 
    | `url` | `String` | **Required**. url documento del contrato |
    | `sueldo` | `Number` | **Required**. sueldo del trabajador |

* Esquema en documento contrato

    ```js
    {
        fecha: ISODate(), // Fecha firma del contrato
        url: url , // documento del contrato
        sueldo: 3000000, // sueldo del trabajador
    }
    ```

### observaciones

* Esquema en tablas contrato

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `id_responsable` | `ObjectId` | **Required**. id Referencia responsable de la observacion | 
    | `fecha` | `Date` | **Required**. fecha de la observacion |
    | `observacion` | `String` | **Required**. observacion |
    | `tipo` | `Number` | **Required**. tipo de la observacion 0 : positiva , 1 : comentario a mejorar, 2 : queja , 3 : diciplinaria , 4 : suspension |

* Esquema en documento contrato

    ```js
    {
        id_responsable: ObjectId() , // id Referencia responsable de la observacion
        fecha: ISODate(), // fecha de la observacion
        observacion: "...", // observacion
        tipo: 0 // tipo de la observacion 0 : positiva , 1 : comentario a mejorar, 2 : queja , 3 : diciplinaria , 4 : suspension
    }
    ```

#### Esquema en documento COLECCION PERSONAL

```js
{
    nombre: "Jane Smith",
    puesto: "Cuidador",
    doc_id: url , // documento de identidad
    experiencia: {
      years: 4,
      descripcion: "cuidador de felinos"
    },
    habilidades: ["Cuidado de felinos", "Primeros auxilios"],
    responsable: [... ObjectId()] , // id refentes a las ares que es responsable, no aplica a puestos administrativos
    arl: [
      {
        eps: url , // Certificación de afiliación a la EPS como cotizante
        pensiones: url , // Certificación de afiliación a Fondo de Pensiones.
        caja_de_compensacion_familiar: url , // Certificación de afiliación a Caja de Compensación Familiar. Con nombre del empleador actual.
        contrato: url , // Contratolaboral
        doc_id: url , // Copia de documento de identidad
      }
    ],
    contrato: {
      fecha: ISODate(), // Fecha firma del contrato
      url: url , // documento del contrato
      sueldo: 3000000, // sueldo del trabajador
    },
    observaciones: [
      {
        id_responsable: ObjectId() , // id Referencia responsable de la observacion
        fecha: ISODate(), // fecha de la observacion
        observacion: "...", // observacion
        tipo: 0 // tipo de la observacion 0 : positiva , 1 : comentario a mejorar, 2 : queja , 3 : diciplinaria , 4 : suspension
      }
    ]
    estado: 0 // Estado del proceso de contratacion
}

```

# Gestion de visistantes 

* Esquema en tablas basica

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `tipo` | `Number` | **Required**.  tipo de visita , 0 : guia_escolar , 1 : investigacion_escolar , 2 :guia_universitaria , 3 : investigacion_universitaria , 4 : recorrido guiado , 5 : evento especial , 6 : general, 7 : investigacion_particular | 
    | `nombre_evento` | `String` | **Required**. razon de la visista |
    | `descripcion` | `String` | **Opcional**. razon de la visista  |
    | `detalle` | `Object` | **Required**. informacion de la visita  |
    | `investigaciones` | `Array` | **Opcional**. lista de investigaciones  |
    | `plan` | `Object` | **Opcional**. Detalles del plan  |
    | `precio_total` | `Number` | **Required**. precio total de la visista  |
    | `descripcion` | `String` | **Opcional**. Documentos del visitante  |

* Esquema en documento para basica

    ```javascript
    {
        tipo: 0 , // tipo de visita , 0 : guia_escolar , 1 : investigacion_escolar , 2 :guia_universitaria , 3 : investigacion_universitaria , 4 : recorrido_guiado , 5 : planes, 6 : general, 7 : investigacion_particular
        detalle : {
            // informacion de la visita
        }
        investigaciones: [
            {
                area: ObjectId() , // id_refetente al area de inventario
                id_investigacion: [...ObjectId() ], // id_refetente a la investigacion de la visita
                descripcion: "...", // razon de la visista
            }
        ], // lista de las investigacion en el recorrido

        // en caso de evento
        plan: {
            nombre_evento: "...",
            id_animales: "..."
            actividades:[
                {

                }
            ],
        }, // razon de la visista

        // en caso de guia_escolar o guia_universitaria
        precio_total: 32423
        descripcion: "...", // razon de la visista
    }
    ```

## detalle

*  Esquema en tablas basica para detalle

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `institucion` | `Number` | **Opcional**.  nombre de la institucion que viene a la visista, si no aplica dejar null | 
    | `responsables` | `Array` | **Required**.  responsables de la visita |
    | `fecha_fin` | `Date` | **Opcional**. fecha fin del evento  |
    | `fecha_inicio` | `Date` | **Required**. fecha inicio del evento  |
    | `areas` | `Array` | **Required**. lista de ObjectId  |
    | `observaciones` | `Array` | **Opcional**. lista de observaciones  |
    | `documentos` | `Object` | **Required**. Documentos del o los visitante/s  |

* Esquema en documento para detalle

    ```javascript
    {
        institucion: "...", // nombre de la institucion que viene a la visista, si no aplica dejar null
        responsables: [... ObjectId()], // responsables de la visita
        fecha_inicio: ISODate(),
        fecha_fin: ISODate(),
        areas: [... ObjectId()], // areas de la visita
        observaciones: [
          {
            responsable: ObjectId(), //responsable de la observacion
            observacion: "...", //observacion
            fecha: ISODate()
          }
        ],
        documentos: {
          act: {
            fecha: ISODate(),
            url: url,
            doc_legal_institucion: url // no es requerida para general, evento especial o particulares
          },
          doc_visitantes: [
            {
                nonbre: ".." // del visitante
              edad: 12 , // edad del visistantes
              doc_id: url, // documento de identidad
                boleta: {
                    tipo: "", // general, vip, escolar, universitaria o investigacion
                    precio_boleta: 7758, // Precio por visitante
                }
              // si es menor de edad debe traer documento de identidad de los padres y carta de permisos
              padres: [
                doc_padres: [..url],
                permiso: url
              ]
              // de lo contrario solo firmar los permisos
              permisos: [..url]
            }
          ] // lista de los visitantes en esta visita con sus documentos
        }
    }
    ```

* Esquema en documento completo para Gestion de visistantes

```js
{
    tipo: 0 , // tipo de visita , 0 : guia_escolar , 1 : investigacion_escolar , 2 :guia_universitaria , 3 : investigacion_universitaria , 4 : recorrido_guiado , 5 : planes, 6 : general, 7 : investigacion_particular
    detalle: {
        institucion: "...", // nombre de la institucion que viene a la visista, si no aplica dejar null
        responsables: [... ObjectId()], // responsables de la visita
        fecha_inicio: ISODate(),
        fecha_fin: ISODate(),
        areas: [... ObjectId()], // areas de la visita
        observaciones: [
          {
            responsable: ObjectId(), //responsable de la observacion
            observacion: "...", //observacion
            fecha: ISODate()
          }
        ],
        documentos: {
          act: {
            fecha: ISODate(),
            url: url,
            doc_legal_institucion: url // no es requerida para general, evento especial o particulares
          },
          doc_visitantes: [
            {
                nonbre: ".." // del visitante
              edad: 12 , // edad del visistantes
              doc_id: url, // documento de identidad
                boleta: {
                    tipo: "", // general, vip, escolar, universitaria o investigacion
                    precio_boleta: 7758, // Precio por visitante
                }
              // si es menor de edad debe traer documento de identidad de los padres y carta de permisos
              padres: [
                doc_padres: [..url],
                permiso: url
              ]
              // de lo contrario solo firmar los permisos
              permisos: [..url]
            }
          ] // lista de los visitantes en esta visita con sus documentos
        }
    }
    investigaciones: [
        {
            area: ObjectId() , // id_refetente al area de inventario
            id_investigacion: [...ObjectId() ], // id_refetente a la investigacion de la visita
            descripcion: "...", // razon de la visista
        }
    ], // lista de las investigacion en el recorrido
    // en caso de evento
    plan: {
        nombre_evento: "...",
        id_animales: "..."
        actividades:[
            {
            }
        ],
    }"...", // razon de la visista
    // en caso de guia_escolar o guia_universitaria
    precio_total: 32423
    descripcion: "...", // razon de la visista
}
```


# Gestion de habitat

* Esquema en tablas basica

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `nombre` | `String` | **Required**. Nombre del habitat | 
    | `tipo_habitat` | `String` | **Required**. tipo de habitat(Selva, Sabana, Acuatico) |
    | `descripcion_ambiente` | `String` | **Required**. Descripcion y su ambiente |
    | `dimensiones` | `Object` | **Opcional**. tipo de habitat(Selva, Sabana, Acuatico) |
    | `enriquecimiento` | `String` | **Opcional**. Decirpción del area y cosas de más |
    | `caracteristicas_ambientales` | `Object` | **Required**. Caracteristicas |
    | `instalaciones_equipos` | `Object` | **Required**. Items en el habitat |
    | `notas_observaciones` | `String` | **Opcional**. observaciones |


* Esquema en documento para data

```js
{
    nombre: "Selva Tropical", //Nombre del habitat*

    tipo_habitat: "selva", //tipo de habitat(Selva, Sabana, Acuatico)*

    descripcion_ambiente: "Hábitat caracterizado por su densa vegetación y alta humedad.", //Descripcion y su ambiente*

    dimensiones: {
        area: 1000, //Área del hábitat (metros cuadrados)*
        volumen: 500 //Volumen del hábitat (si es acuático o tiene dimensiones verticales)*
    },

    enriquecimiento: "Actividades de enriquecimiento incluyen escondites y juegos de búsqueda de alimento.", //Descripción de actividades de enriquecimiento proporcionadas en el hábitat para estimular el comportamiento natural de los animales*

    caracteristicas_ambientales: {
        
        // Caracteristicas del ambiente

    },

    instalaciones_equipos: {
        // items del equipo
    },

    notas_observaciones: "Se deben mantener condiciones ambientales controladas para asegurar el bienestar de los animales."
}
```

### caracteristicas_ambientales

* Esquema en tablas caracteristicas_ambientales

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `temperatura_promedio` | `Number` | **Required**. Temperatura en tiempo real del ambiente | 
    | `humedad_relativa` | `Number` | **Required**. Humedad en tiempo real del ambiente |
    | `tipo_sustrato` | `String` | **Required**. Tipo de sustrato (tierra, arena, agua) |
    | `vegetacion` | `String` | **Required**. Vegetación y tipos de plantas |

* Esquema en documento para caracteristicas_ambientales

```js
{
    temperatura_promedio: 25,
    humedad_relativa: 80,
    tipo_sustrato: "tierra",*//Tipo de sustrato (tierra, arena, agua)*
    vegetacion: "Diversas especies de árboles y plantas tropicales."*//Vegetación y tipos de plantas*
}
```

### instalaciones_equipos

* Esquema en tablas instalaciones_equipos

    | Parametro | Type     |Descripción            |
    | :--------: | :-------: | :------------------------- |
    | `elementos` | `Array` | **Required**. Lista de items | 
    | `equipos` | `String` | **Required**. Descripción de cualquier equipo especial necesario (calentadores, iluminación, sistemas de filtración, etc.) |

* Esquema en documento para instalaciones_equipos

```js
{
    elementos: ["Árboles", "Rocas", "Estanques"],
    equipos: "Sistemas de riego y calefacción."*//Descripción de cualquier equipo especial necesario (calentadores, iluminación, sistemas de filtración, etc.)*
}
```

#### Esquema en documento completo para Gestion de habitat


```js
{
    nombre: "Selva Tropical", *//Nombre del habitat*

    tipo_habitat: "selva", *//tipo de habitat(Selva, Sabana, Acuatico)*

    descripcion_ambiente: "Hábitat caracterizado por su densa vegetación y alta humedad.",*//Descripcion y su ambiente*

    dimensiones: {
        area: 1000, *//Área del hábitat (metros cuadrados)*
        volumen: 500 *//Volumen del hábitat (si es acuático o tiene dimensiones verticales)*
    },

    enriquecimiento: "Actividades de enriquecimiento incluyen escondites y juegos de búsqueda de alimento.",*//Descripción de actividades de enriquecimiento proporcionadas en el hábitat para estimular el comportamiento natural de los animales*

    caracteristicas_ambientales: {
        temperatura_promedio: 25,
        humedad_relativa: 80,

        tipo_sustrato: "tierra",*//Tipo de sustrato (tierra, arena, agua)*
        vegetacion: "Diversas especies de árboles y plantas tropicales."*//Vegetación y tipos de plantas*
    },

    instalaciones_equipos: {

        elementos: ["Árboles", "Rocas", "Estanques"],

        equipos: "Sistemas de riego y calefacción."*//Descripción de cualquier equipo especial necesario (calentadores, iluminación, sistemas de filtración, etc.)*

    },


    notas_observaciones: "Se deben mantener condiciones ambientales controladas para asegurar el bienestar de los animales."

}  
```

DOCUMENTACION

FLUJO ADQUISICON ANIMALES

1. SE CREA UN ANIMAL DE UNA VEZ CON ESTADO ACTIVO O SEA "ESTADO=1", AL CREARCE, DE UNA VEZ SE EXTRAE EL ID DE ESE ANIMAL Y  SE CREA TAMBIEN LA ADQUISICION QUE HAGA REFERENCIA, EN EL BODY DEBE QUE IR TODA LA INFO

FLUJO BAJA DE ANIMALES

1. AL DAR BAJA DE ANIMALES, SE USA BAJA DE ANIMALES CON LOS DATOS Y AL CREARSE LA BAJA, SE MODIFICA LA COLECCION DE ANIMALES EL CAMPO "ESTADO" PARA QUE SEA 0, O SEA ESTADO BAJO






