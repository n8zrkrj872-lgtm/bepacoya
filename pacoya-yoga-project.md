# Pacoya Yoga — Documento de Proyecto

> *"Vivir es urgente."*

---

## Resumen del Proyecto

**Sitio web:** [bepacoya.com](https://bepacoya.com)  
**Repositorio:** [github.com/n8zrkrj872-lgtm/bepacoya](https://github.com/n8zrkrj872-lgtm/bepacoya)  
**Estado:** Publicado y en producción  
**Instructora:** Bryanna Osuna  
**Correo oficial:** contacto@bepacoya.com (Google Workspace)  
**Teléfono / WhatsApp:** 686 187 5393

---

## Stack Tecnológico (implementado)

| Capa | Tecnología |
|---|---|
| Frontend | HTML + CSS + JavaScript vanilla (ES Modules) |
| Base de datos | Supabase (PostgreSQL) |
| Hosting | GitHub Pages (auto-deploy desde rama `main`) |
| Dominio | bepacoya.com via Hostinger DNS |
| Email | Google Workspace → contacto@bepacoya.com |
| Formulario de contacto | Formspree (endpoint `xeenvjnp`) |
| Clases en vivo | Whereby (link con código de acceso privado) |
| Tipografía | Cormorant Garamond + DM Sans (Google Fonts) |

---

## Páginas del Sitio

### `index.html` — Página principal
Secciones en orden:
1. **Hero** — frase principal + llamadas a acción
2. **Nosotros** — historia del estudio y valores
3. **Oncología** — sección destacada de yoga oncológico
4. **Servicios** — tarjetas de servicios ofrecidos
5. **Eventos** — próximos eventos cargados desde Supabase
6. **Memorias** — eventos pasados con fotos (desde Supabase)
7. **Pensamientos** — últimas 3 entradas del blog (preview)
8. **Testimonios** — testimonios de alumnas
9. **Clases en Vivo** — acceso privado con código
10. **Contacto** — formulario conectado a Formspree

### `pensamientos.html` — Blog completo
- Carga todos los pensamientos activos desde Supabase
- Ordenados por fecha descendente
- Soporta anchor links (`#p-{id}`) para navegación directa

### `memorias.html` — Galería de eventos pasados
- Eventos con `foto_url` y fecha pasada
- Tarjetas con imagen, título, descripción y fecha

### `admin.html` — Panel de administración
Acceso directo por URL (sin contraseña — URL privada).  
Pestañas:
- **Eventos** — crear/editar próximos eventos
- **Memorias** — agregar fotos a eventos pasados
- **Pensamientos** — publicar entradas del blog
- **En Vivo** — activar clase, pegar link de Whereby, definir código de acceso

### `regresa.html` — Experiencia de respiración
- Página independiente de meditación/respiración
- Dos modos: **Respiración Cuadrada** (4-4-4-4) y **Respiración Calma** (4-6)
- Animación de partículas + wordmark "Pacoya" que respira
- Nav oculto en acceso directo, visible solo al navegar desde el sitio
- Transición de fade oscuro al entrar y salir
- Ícono propio (`regresa-icon.png`)

---

## Base de Datos — Supabase

### Tabla `eventos`
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | int | Primaria |
| `titulo` | text | Nombre del evento |
| `descripcion` | text | Descripción breve |
| `fecha` | date | Fecha del evento |
| `hora` | text | Hora (ej. "10:00 AM") |
| `lugar` | text | Lugar o modalidad |
| `tipo` | text | `meditacion`, `taller`, `especial`, `retiro` |
| `activo` | bool | Si se muestra en el sitio |
| `foto_url` | text | URL de foto (para memorias) |

### Tabla `pensamientos`
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | int | Primaria |
| `titulo` | text | Título de la entrada |
| `contenido` | text | Cuerpo del texto |
| `fecha` | date | Fecha de publicación |
| `tipo` | text | `reflexion`, `inspiracion`, `oncologico` |
| `activo` | bool | Si se muestra en el sitio |

### Tabla `clases_en_vivo`
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | int | Siempre id=1 (fila única) |
| `titulo` | text | Nombre de la clase |
| `stream_url` | text | Link de Whereby |
| `codigo` | text | Código de acceso (mayúsculas) |
| `activo` | bool | Si hay clase activa ahora |

---

## Funcionalidades Implementadas

- [x] Sitio publicado en bepacoya.com con SSL
- [x] Navbar responsivo con menú hamburguesa (iOS full-screen)
- [x] Favicon + apple-touch-icon para shortcut en iPhone
- [x] Eventos dinámicos desde Supabase (próximos y pasados)
- [x] Blog "Pensamientos" con página completa y anchors
- [x] Panel de administración completo
- [x] Clases en vivo con código de acceso (Whereby)
- [x] Formulario de contacto vía Formspree (sin redirección)
- [x] Botón flotante de WhatsApp en móvil (transparente, respeta el footer)
- [x] Correo corporativo contacto@bepacoya.com (Google Workspace)
- [x] Página "Regresa" — experiencia de respiración guiada
- [x] Transiciones de fade oscuro entre páginas
- [x] Scroll reveal en secciones
- [x] SEO básico (meta description en todas las páginas)

---

## DNS Hostinger — bepacoya.com

| Tipo | Nombre | Valor |
|---|---|---|
| ALIAS / CNAME | @ | n8zrkrj872-lgtm.github.io |
| MX | @ | ASPMX.L.GOOGLE.COM (p1) |
| MX | @ | ALT1/ALT2.ASPMX.L.GOOGLE.COM (p5) |
| MX | @ | ALT3/ALT4.ASPMX.L.GOOGLE.COM (p10) |
| TXT | @ | Verificación Google Workspace |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` |

---

## Identidad Visual

| Variable | Valor |
|---|---|
| `--verde-salvia` | `#7A9E7E` |
| `--crema` | `#FAF7F2` |
| `--tierra` | `#3D2F22` |
| `--tierra-claro` | `#6B5240` |
| `--dorado` | `#B5956A` |
| `--blanco` | `#FFFFFF` |

Tono: orgánico, calmante, contemplativo. Sin neon ni elementos agresivos.

---

## Redes Sociales

- Facebook: [facebook.com/pacoyayoga](https://www.facebook.com/pacoyayoga/)
- Instagram: [instagram.com/pacoyayoga](https://www.instagram.com/pacoyayoga/)
- TikTok: [tiktok.com/@pacoyayoga](https://www.tiktok.com/@pacoyayoga)

---

*Última actualización: mayo 2026 · Versión 2.0*
