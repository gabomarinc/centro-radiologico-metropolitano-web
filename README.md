<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Metropolitano Advanced Radiology

Aplicación web para gestión de radiología avanzada, construida con React, Vite y Google Gemini AI.

## 🚀 Desarrollo Local

### **Prerequisitos**
- Node.js (versión 18 o superior)
- npm o yarn

### **Pasos de Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio-url>
   cd metropolitano-advanced-radiology
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Copia el archivo `.env.example` a `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Obtén tu API key de Gemini en: https://aistudio.google.com/app/apikey
   - Edita `.env.local` y añade tu API key:
     ```
     GEMINI_API_KEY=tu_api_key_aqui
     ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

## 📦 Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

Para previsualizar el build:
```bash
npm run preview
```

## 🌐 Deploy en Vercel

### **Opción 1: Deploy desde GitHub (Recomendado)**

1. **Subir el código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <tu-repositorio-url>
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configurar variables de entorno en Vercel**
   - En la página de configuración del proyecto, ve a "Environment Variables"
   - Añade:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** tu API key de Gemini
   - Guarda los cambios

4. **Deploy**
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará tu aplicación automáticamente

### **Opción 2: Deploy con Vercel CLI**

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Sigue las instrucciones del CLI
   - Añade la variable de entorno `GEMINI_API_KEY` cuando se te solicite

4. **Deploy a producción**
   ```bash
   vercel --prod
   ```

## 🔄 Deployments Automáticos

Una vez conectado el repositorio con Vercel:
- Cada push a la rama `main` desplegará automáticamente a producción
- Los Pull Requests generarán previews automáticos

## 📝 Tecnologías Utilizadas

- **React 19** - UI Library
- **Vite 6** - Build tool
- **TypeScript** - Type safety
- **React Router** - Navegación
- **Lucide React** - Iconos
- **Google Gemini AI** - Inteligencia artificial

## 🔒 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `GEMINI_API_KEY` | API key de Google Gemini | ✅ Sí |

## 📄 Licencia

Private project

---

Para más información sobre AI Studio: https://ai.studio/apps/drive/1BunA35-oTYeXJKm_0_u9Q6iD3NMMsk67
