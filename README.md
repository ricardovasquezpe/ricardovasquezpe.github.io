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
