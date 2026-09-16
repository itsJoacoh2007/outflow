# NON X V25 — CATÁLOGO VACÍO Y LISTO PARA PRODUCTOS REALES

## El cambio más importante de esta pasada
`data/products.json` y `LOCAL_PRODUCTS` ahora son `[]`. La tienda ya no
muestra los 9 productos de referencia (que, como se documentó en
auditorías anteriores, eran fotos reales de Nike/Jordan/CBF y Polo
Ralph Lauren). No había forma honesta de "arreglar" ese catálogo — la
única opción correcta era vaciarlo y dejar la tienda lista para las
piezas reales que confeccione el equipo.

## Se encontraron y limpiaron más casos de los ya conocidos
Al revisar cada imagen no-de-producto del sitio (no solo el catálogo),
aparecieron problemas adicionales que ninguna auditoría anterior había
detectado:
- `assets/images/hero.jpg`: no era una foto de producto, pero tenía el
  wordmark **"OUTFLOW"** (la marca anterior) incrustado directamente en
  los píxeles de la imagen — invisible al buscar texto en el código,
  solo se veía abriendo el archivo.
- `assets/images/products.jpg` y `categories.jpg`: sprites usados como
  fondo de las categorías y como respaldo genérico — contenían fotos
  reales de **Nike Air Force 1** y **New Balance**, sin relación con
  ningún producto del catálogo. Se usaban en la portada (sección
  Categorías) independientemente de qué hubiera en products.json.
- El `poster` del video del hero apuntaba a otra foto de Ralph Lauren.

Los tres archivos se eliminaron. Ninguna imagen de otra marca queda en
el proyecto.

## Reemplazos — sin fotografía de terceros, sin fotografía inventada
En vez de generar fotos falsas de ropa (que serían igual de deshonestas
que las robadas), todo lo que antes dependía de fotografía ahora usa
gráficos propios:
- **Categorías**: iconos de línea dibujados a mano (SVG), uno por
  categoría, sobre un panel oscuro — sin fotografía.
- **Placeholder de producto sin foto**: un ícono SVG propio (percha +
  "SIN IMAGEN AÚN"), generado como data-URI, sin archivo externo.
- **Imagen para compartir en redes (og:image)**: generada de cero,
  solo tipografía y grilla — nada de fotografía.

## Estados vacíos en todo el sitio (antes rompían o quedaban en blanco)
- **Hero**: sin un producto marcado como "drop", ahora muestra un
  estado "El archivo se abre pronto" con CTA a la lista de espera —
  antes intentaba cargar un video de producto que ya no existe y
  arrojaba un error de JavaScript que detenía el resto del script.
- **Nuevo Drop** (portada): mensaje propio en vez de quedar en blanco.
- **Grilla del catálogo**: distingue "todavía no hay productos" de
  "no hay resultados para tu búsqueda" (antes usaban el mismo mensaje,
  que no tenía sentido con el catálogo realmente vacío).
- Todos los textos de estos estados están traducidos (ES/EN/PT) y se
  actualizan solos si el visitante cambia de idioma.

## Bug encontrado de paso (no relacionado a lo anterior)
Las etiquetas de categoría (`CAMISETAS`, `JEANS`, `POLERONES`,
`ZAPATILLAS`) llevaban meses mostrándose como `tshirts`, `jeans`,
`hoodies`, `sneakers` en minúscula — las claves de traducción nunca se
habían definido en `language.js`, así que el sistema de idiomas caía
en su propio texto de respaldo. Corregido en los 3 idiomas.

## Admin
El banner de `admin.html` ahora explica que el catálogo está vacío a
propósito y que la tienda está lista para el primer producto real.
