# 🥬 Lechuguita

> Aplicación web minimalista para consultar cotizaciones del dólar en Argentina

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Aplicación web simple y elegante que muestra las cotizaciones del dólar en Argentina en tiempo real. Diseñada con un enfoque minimalista usando Water.css y una paleta de colores verde.

## ✨ Características

- ✅ **Diseño Minimalista**: Interfaz limpia con Water.css
- ✅ **Paleta Verde**: Tonos verdes naturales y frescos
- ✅ **Tiempo Real**: Cotizaciones actualizadas del dólar
- ✅ **Responsive**: Adaptable a cualquier dispositivo
- ✅ **Dark Mode**: Automático según preferencias del sistema
- ✅ **Seguridad**: Helmet, CORS, Rate Limiting
- ✅ **PWA Ready**: Service Worker y Manifest
- ✅ **Docker**: Listo para contenedores

## 🚀 Stack Tecnológico

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.x
- **HTTP Client**: Axios
- **Seguridad**: Helmet, CORS, express-rate-limit

### Frontend
- **CSS**: Water.css (framework sin clases)
- **JavaScript**: Vanilla JS (ES2021+)
- **Diseño**: Minimalista con paleta verde
- **PWA**: Service Worker + Manifest

### DevOps
- **Package Manager**: pnpm
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Container**: Docker + Docker Compose

## 📦 Instalación

### Requisitos Previos

- Node.js >= 18.17.0 ([Descargar](https://nodejs.org/))
- pnpm >= 8.0.0 (`npm install -g pnpm`)

### Instalación Local

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd lechuguita

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tu configuración
nano .env
```

## ⚙️ Configuración

El archivo `.env` contiene toda la configuración necesaria:

```env
# Entorno
NODE_ENV=development
PORT=3003

# CORS
CORS_ORIGIN=*


# SSL (false solo para desarrollo)
REJECT_UNAUTHORIZED=false
```

**Importante**: La URL de la API debe estar únicamente en el archivo `.env`

## 🏃 Uso

### Modo Desarrollo

```bash
pnpm dev
# Servidor en http://localhost:3003
```

### Modo Producción

```bash
pnpm start
```

### Testing

```bash
# Ejecutar tests
pnpm test

# Tests con coverage
pnpm test:coverage
```

### Docker

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📁 Estructura del Proyecto

```
lechuguita/
├── config/                 # Configuraciones
│   ├── env.js             # Variables de entorno
│   └── https.js           # Configuración HTTPS
├── routes/                # Rutas de Express
│   ├── index.js           # Ruta principal (home)
│   └── api.js             # Rutas de API
├── services/              # Servicios
│   └── tuServicio.js      # Servicio de cotizaciones
├── views/                 # Vistas HTML
│   └── home.js            # Vista principal con Water.css
├── public/                # Archivos estáticos
│   ├── js/
│   │   └── app.js         # JavaScript del cliente
│   ├── sw/
│   │   └── service-worker.js  # Service Worker
│   ├── manifest.json      # PWA Manifest
│   └── favicon.svg        # Favicon (🥬)
├── tests/                 # Tests
├── index.js               # Punto de entrada
├── .env                   # Variables de entorno
├── .env.example           # Template de configuración
├── package.json           # Dependencias
└── docker-compose.yml     # Docker
```

## 🔌 Endpoints de API

### Health Check
```
GET /api/health
```
Verifica el estado del servidor

### Información del Proyecto
```
GET /api/info
```
Retorna información básica del proyecto

### Cotizaciones del Dólar
```
GET /api/cotizaciones
```
Obtiene todas las cotizaciones del dólar en Argentina

Respuesta:
```json
{
  "success": true,
  "data": [
    {
      "nombre": "Oficial",
      "compra": 950.50,
      "venta": 990.50,
      "fechaActualizacion": "2025-12-26T10:00:00.000Z"
    },
    ...
  ]
}
```

## 🎨 Diseño

### Paleta de Colores

```css
:root {
  --verde-oscuro: #1b4332;      /* Textos principales */
  --verde-bosque: #2d6a4f;      /* Fondos principales */
  --verde-medio: #40916c;       /* Acentos */
  --verde-claro: #52b788;       /* Hover effects */
  --verde-pastel: #74c69d;      /* Bordes */
  --verde-menta: #95d5b2;       /* Fondos suaves */
  --verde-suave: #b7e4c7;       /* Cajas de valores */
  --verde-muy-claro: #d8f3dc;   /* Fondos claros */
}
```

### Características del Diseño

- **Header compacto**: Título capitalizado con gradiente verde
- **Tarjetas minimalistas**: Bordes sutiles y espaciado reducido
- **Sin animaciones hover**: Diseño estático y profesional
- **Centrado**: Layout centrado para mejor legibilidad
- **Water.css**: Framework CSS sin clases para HTML semántico

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm start` | Iniciar en modo producción |
| `pnpm dev` | Modo desarrollo |
| `pnpm test` | Ejecutar tests |
| `pnpm lint` | Verificar código |
| `pnpm format` | Formatear código |

## 📝 Variables de Entorno

| Variable | Descripción | Defecto |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3003` |
| `CORS_ORIGIN` | Origen CORS permitido | `*` |
| `DOLAR_API_URL` | URL de la API de cotizaciones | DolarAPI |
| `REJECT_UNAUTHORIZED` | Verificar SSL | `false` |

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso cross-origin configurable
- **Rate Limiting**: 100 requests/15min en endpoints `/api/`
- **HTTPS Agent**: Configuración SSL para APIs externas
- **CSP**: Content Security Policy configurado dinámicamente
- **Environment Variables**: Configuración sensible en `.env`

## 🐳 Deployment

### Docker

```bash
# Build
docker build -t lechuguita .

# Run
docker run -p 3003:3003 --env-file .env lechuguita
```

### Servicios Cloud

Compatible con:
- **Heroku**
- **Vercel**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

## 🌐 API Externa

Este proyecto consume la API pública de [DolarAPI](https://dolarapi.com) para obtener las cotizaciones del dólar en Argentina.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- [Water.css](https://watercss.kognise.dev/) - Framework CSS minimalista
- [Express.js](https://expressjs.com/) - Framework web
- [Node.js](https://nodejs.org/) - Runtime

---

⭐ Hecho con 💚 y mucha lechuga 🥬
