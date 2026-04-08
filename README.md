# CIBAI Studio v5 — i18n + Admin Panel

Sitio web corporativo de CIBAI Studio con estética **Cyberpunk Brutal**, sistema de internacionalización (ES/CA) y panel de administración para gestionar traducciones y usuarios.

## Stack

- **Astro 6** — SSR con adaptador Node.js
- **Tailwind CSS v4** — Utility-first CSS via Vite plugin
- **TypeScript** — Strict mode
- **better-sqlite3** — Base de datos para usuarios y sesiones
- **bcryptjs** — Hash de contraseñas
- **@astrojs/node** — Adaptador SSR para Node.js
- **@astrojs/sitemap** — SEO sitemap generation

## Funcionalidades

### Internacionalización (i18n)
- Soporte para **Castellano** (ES) y **Catalán** (CA)
- Archivos JSON de traducciones organizados por sección
- Selector de idioma visible en la navegación
- Rutas: `/` (castellano por defecto), `/ca/` (catalán)
- Extensible: añadir un nuevo idioma = copiar y traducir el JSON

### Panel de Administración (`/admin`)
- Login con email + contraseña
- Edición de traducciones agrupadas por sección:
  - Página principal (Hero/Inicio)
  - Servicios
  - Proceso
  - Portfolio / Casos de éxito
  - Studio
  - Contactar
  - Navegación, Footer, HUD, SEO
- Gestión de usuarios (CRUD) — solo superadmins

### Usuarios
- Superadministrador inicial: `matias@cibergeda.com` / `12345678`
- Roles: `superadmin`, `editor`
- Sesiones con cookie httpOnly (7 días)

## Estructura

```
src/
  components/
    HomePage.astro          — Componente principal con todas las secciones
    LanguageSelector.astro  — Selector de idioma ES/CA
  i18n/
    index.ts                — Utilidades de i18n
    es.json                 — Traducciones castellano
    ca.json                 — Traducciones catalán
  layouts/
    Layout.astro            — Layout público con head, OG tags, JSON-LD
    AdminLayout.astro       — Layout del panel de administración
  lib/
    auth.ts                 — Autenticación y sesiones
    db.ts                   — Base de datos SQLite (usuarios, sesiones)
    translations.ts         — Gestión de archivos de traducción
  pages/
    index.astro             — Página principal (ES)
    ca/index.astro          — Página principal (CA)
    admin/
      login.astro           — Login del admin
      index.astro           — Editor de traducciones
      users.astro           — Gestión de usuarios
      logout.astro          — Cierre de sesión
    aviso-legal.astro       — Aviso legal (ES)
    cookies.astro           — Política de cookies (ES)
    privacidad.astro        — Política de privacidad (ES)
    ca/aviso-legal.astro    — Aviso legal (CA)
    ca/cookies.astro        — Política de cookies (CA)
    ca/privacidad.astro     — Política de privacidad (CA)
  styles/global.css         — Theme cyberpunk, animaciones, componentes
data/                       — Base de datos SQLite (gitignored)
```

## Setup local

```bash
npm install
npm run dev       # Dev server en localhost:4321
npm run build     # Build SSR
npm run preview   # Preview local
```

La base de datos se crea automáticamente en `data/cibai.db` al primer arranque, con el superadmin por defecto.

## Añadir un nuevo idioma

1. Copiar `src/i18n/es.json` a `src/i18n/XX.json`
2. Traducir todos los textos
3. Añadir el locale en `src/i18n/index.ts` y `astro.config.mjs`
4. Crear la carpeta `src/pages/XX/` con las páginas correspondientes

## Contacto

- Web: [cibai.studio](https://cibai.studio)
- Email: hola@cibai.studio
- Ubicación: Barcelona, España
