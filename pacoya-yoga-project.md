# 🌿 Pacoya Yoga — Documento de Proyecto

> *"Encuentra tu equilibrio. Sana desde adentro."*

---

## 📋 Resumen del Proyecto

**Nombre del sitio:** Pacoya Yoga  
**Tipo:** Landing Page + Web App  
**Idioma:** Español  
**Objetivo:** Promocionar el estudio de yoga, ofrecer clases en línea con acceso privado, publicar pensamientos positivos y gestionar eventos exclusivos para miembros.

---

## 🎯 Propósito y Audiencia

### Propósito Principal
Crear una presencia digital que refleje la filosofía de bienestar de Pacoya Yoga, con especial énfasis en el **yoga oncológico** — una práctica especializada para personas que viven o han vivido con cáncer, impartida por instructora certificada.

### Audiencia Objetivo
- Adultos interesados en yoga y bienestar general
- Personas en proceso oncológico o recuperación
- Miembros activos que asisten a eventos y clases especiales
- Personas que buscan clases en línea desde casa

---

## 🗂️ Secciones de la Página

### 1. Hero
- Frase principal inspiradora
- Llamada a la acción: *"Únete a nuestra comunidad"* y *"Ver clases en vivo"*
- Estética visual calmante (tonos verdes, crema y tierra)

### 2. Sobre Nosotros
- Historia del estudio Pacoya Yoga
- Presentación de la instructora principal, **certificada en Yoga Oncológico**
- Valores: presencia, sanación, comunidad, compasión
- Destacar la especialización oncológica como diferenciador único

### 3. Servicios
| Servicio | Descripción |
|---|---|
| Yoga General | Clases para todos los niveles |
| Yoga Oncológico | Práctica especializada para personas en proceso de tratamiento o recuperación de cáncer. Instructora certificada. |
| Meditación | Sesiones guiadas de meditación y mindfulness |
| Clases en Línea | Transmisión en vivo con código de acceso privado |
| Sesiones Especiales | Talleres y retiros para miembros |

### 4. Clases en Vivo (Acceso Privado)
- Sección protegida con **código de acceso único** por clase
- El código se proporciona a los miembros con anticipación
- Reproductor integrado (YouTube Live / Zoom / Vimeo — por definir)
- Diseño limpio que no revela el contenido hasta ingresar el código

### 5. Eventos para Miembros
Sección dedicada a actividades exclusivas de la comunidad Pacoya:
- Clases de meditación grupales
- Sesiones especiales temáticas
- Talleres de bienestar
- Retiros y encuentros presenciales
- Formato: tarjetas de evento con fecha, hora, descripción y botón RSVP

### 6. Blog — Pensamientos Positivos
- Publicaciones diarias o frecuentes
- Reflexiones, frases inspiradoras, tips de bienestar
- Formato sencillo: título + texto + fecha
- Escritura personal de la instructora

### 7. Testimonios
- Comentarios de alumnas y alumnos
- Especialmente de personas que han tomado yoga oncológico
- Formato: foto (opcional), nombre, testimonio

### 8. Contacto
- Formulario de contacto: nombre, correo, mensaje
- Redes sociales
- Ubicación (si aplica)
- Horarios de clases

---

## 🎨 Identidad Visual

### Paleta de Colores
| Nombre | Uso | Hex sugerido |
|---|---|---|
| Verde salvia | Color principal, botones, acentos | `#7A9E7E` |
| Verde pálido | Fondos suaves | `#EBF3EC` |
| Crema | Fondo general | `#FAF7F2` |
| Tierra / Bark | Títulos y textos | `#3D2F22` |
| Dorado suave | Detalles y separadores | `#B5956A` |

### Tipografía
- **Display / Títulos:** Cormorant Garamond (serif elegante)
- **Cuerpo / UI:** DM Sans (limpio y legible)

### Tono Visual
Orgánico, calmante, sereno. Inspirado en la naturaleza: hojas, tierra, luz filtrada. Sin elementos agresivos ni colores saturados.

---

## ⚙️ Funcionalidades Técnicas

### Clases en Vivo con Código de Acceso
- Campo de texto donde el usuario ingresa su código
- Validación del código (puede ser simple JS o conectado a base de datos)
- Al ingresar código correcto → se muestra el reproductor de video en vivo
- Al ingresar código incorrecto → mensaje de error amable

### Blog / Pensamientos Positivos
- Publicaciones en formato simple
- Posibilidad futura de conectar a CMS (Notion, Contentful, etc.)
- Por ahora: contenido estático o administrado manualmente en el código

### Sección de Eventos
- Tarjetas de eventos con: título, fecha, hora, descripción, tipo (meditación, sesión especial, taller)
- Botón de registro o confirmación de asistencia
- Posibilidad de enviar correo de confirmación en versión futura

---

## 🛠️ Stack Tecnológico Sugerido

| Capa | Tecnología | Razón |
|---|---|---|
| Frontend | HTML + CSS + JavaScript | Ligero, sin dependencias, fácil de mantener |
| Fuentes | Google Fonts | Cormorant Garamond + DM Sans |
| Video en Vivo | YouTube Live embed | Gratuito, confiable, fácil integración |
| Formulario de contacto | Formspree / Netlify Forms | Sin backend propio necesario |
| Hosting | Netlify / Vercel | Gratuito para proyectos estáticos |
| Dominio sugerido | `pacoyayoga.com` o `pacoya.yoga` | — |

---

## 📅 Fases de Desarrollo

### Fase 1 — Base visual (semana 1–2)
- [ ] Hero + Navbar
- [ ] Sección Sobre Nosotros
- [ ] Sección Servicios
- [ ] Footer

### Fase 2 — Contenido dinámico (semana 3)
- [ ] Sección Eventos
- [ ] Blog / Pensamientos Positivos
- [ ] Sección Testimonios

### Fase 3 — Funcionalidades especiales (semana 4)
- [ ] Sección Clases en Vivo con código de acceso
- [ ] Formulario de contacto funcional
- [ ] Optimización móvil

### Fase 4 — Lanzamiento
- [ ] Revisión de contenido final
- [ ] Pruebas en dispositivos
- [ ] Deploy a Netlify/Vercel
- [ ] Conectar dominio

---

## 📝 Contenido Pendiente a Proporcionar

Para avanzar con el desarrollo, se necesita:

- [ ] Nombre completo de la instructora
- [ ] Breve biografía personal
- [ ] Certificación de Yoga Oncológico (nombre, institución)
- [ ] Foto de la instructora (o imagen representativa)
- [ ] Servicios exactos con precios (si se publicarán)
- [ ] Horarios de clases
- [ ] Correo electrónico de contacto
- [ ] Redes sociales (Instagram, Facebook, etc.)
- [ ] Plataforma preferida para transmisión en vivo (YouTube / Zoom / Vimeo)
- [ ] 2–3 testimonios reales de alumnas/alumnos
- [ ] Logo (si existe), o definir si se crea uno

---

## 💡 Notas Importantes

- El **yoga oncológico** es el diferenciador más poderoso de Pacoya. Debe estar destacado visualmente y con su propio espacio explicativo, ya que es un servicio especializado que genera mucha confianza y emoción en personas que lo necesitan.
- El tono de toda la comunicación debe ser **cálido, esperanzador y sin tecnicismos médicos**.
- La sección de clases en vivo debe sentirse **exclusiva y segura** — los miembros deben sentir que es un espacio privado y protegido.
- El blog de pensamientos positivos puede ser una herramienta poderosa de fidelización si se actualiza con regularidad.

---

*Documento creado para el proyecto Pacoya Yoga · Versión 1.0*
