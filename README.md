# Portfolio académico — Ricardo

Diseño HTML estático para una postulación a Erasmus Mundus MAIA. Sin dependencias, animaciones ni proceso de compilación.

## Ver el diseño

Abre `index.html` en tu navegador. Todas las páginas funcionan directamente desde el disco. Para servirlo localmente, ejecuta `python3 -m http.server 8000` desde esta carpeta y visita http://localhost:8000.

## Páginas

- `index.html`: About me y Skills sin retrato, Education & certifications, Selected projects, Experience y galería.
- `volunteering.html`: voluntariado con un espacio para una fotografía.
- `projects.html`: proyectos adicionales.
- `awards.html`: honores y premios.
- `styles.css`: estilos compartidos y adaptación a móvil.
- `script.js`: menú móvil accesible, cambio de tema y carrusel automático.
- `theme.js`: aplica el tema guardado antes de mostrar la página.

## Personalizar antes de publicar

Todo texto entre corchetes es un marcador para reemplazar con información real. Los intereses y herramientas también son ejemplos; conserva únicamente los tuyos. Cambia el nombre y los enlaces de correo (`your.name@example.com`) y LinkedIn en los HTML. Los enlaces de contacto actuales son ejemplos.

Los SVG de proyectos son portadas ilustrativas, no resultados científicos. Sustituye cada `src` por una captura o fotografía real del proyecto y actualiza su `alt`; elimina la etiqueta `ILLUSTRATIVE COVER` al hacerlo.

Para tus fotos, reemplaza el bloque `<div class="photo-placeholder">...</div>` por `<img class="personal-photo" src="assets/tu-foto.jpg" alt="Descripción de la fotografía" width="900" height="650">`, y agrega en `styles.css`: `.personal-photo { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }`. Actualiza también el pie de foto. Usa una foto tuya con el equipo en Experience y fotos distintas en la galería y Volunteering.

Se omiten enlaces a repositorios, certificados y CV hasta que tengas los archivos o URLs reales; agrégalos como enlaces descriptivos en cada entrada. No hay logros ni credenciales inventados.

El diseño usa inglés por el contexto internacional de la postulación. Puedes editar directamente los textos y el atributo `lang` si prefieres otro idioma.

## Controles del diseño

- El botón del encabezado alterna entre modo claro y oscuro en todas las páginas. Guarda la preferencia en este navegador; al abrir por primera vez sigue el tema del sistema.
- “Explore more projects” abre la página de proyectos adicionales.
- Se muestran dos experiencias inicialmente. “Show more experience” expande las entradas adicionales; “Show less experience” vuelve a ocultarlas.
- “Beyond the work” muestra tres fotografías en escritorio y una en móvil. Se desplaza continuamente en bucle, sin pausas entre imágenes, a un ritmo de una tarjeta cada 6,5 segundos, con flechas, gestos táctiles y teclado. Incluye Play/Pause y se detiene incluso a mitad de transición al pasar el cursor, al enfocar sus controles con el teclado o al cambiar de pestaña. Si el sistema prefiere movimiento reducido, inicia pausado.

## Fotografías incorporadas

Las 15 fotografías proporcionadas están en `assets/photos/`: Pagao aparece en Selected projects, CIX y nuevos negocios en Relevant experience, y las 13 restantes en Beyond the work, sin repetir imágenes entre secciones. Se conservan los originales y sus proporciones en la galería.

Las fechas confirmadas provienen del usuario y del CV. La despedida de Oktana se sitúa en 2024, el último año de su empleo; la limpieza de playas en 2023, según el CV. Los primeros días de Oktana y FTF se rotulan c. 2021 y c. 2017, respectivamente, como aproximaciones basadas en el inicio de esos empleos. La foto intermedia de FTF usa el período laboral 2017–2020 sin atribuir un año exacto. El reencuentro de 2024 ocurrió cuatro años después de la salida de FTF en 2020. La graduación permanece sin fecha porque el año de la ceremonia no está confirmado.

La foto inicial de Oktana fue reemplazada por una nueva foto de equipo en oficina, rotulada con el período laboral 2021–2024 sin atribuir un año exacto. MiDoc ahora usa su foto real de equipo en lugar de la ilustración, con el período del proyecto 2024–2025. La foto de despedida de Oktana se conserva.

Actualización de pies: CIX celebra resultados y su equipo deportivo se denomina CIX soccer team. Se retiró la fotografía de despedida de Oktana del carrusel. La foto intermedia de FullTimeForce se rotula c. 2018 como año aproximado dentro de 2017–2020; no es una fecha confirmada.
