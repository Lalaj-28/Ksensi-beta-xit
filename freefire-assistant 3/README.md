# KSENSI VIP - Free Fire Assistant

Una aplicación completa para asistencia en Free Fire con controles avanzados, deep linking nativo y configuración mediante archivo plist.

## 🎮 Características

- **HeadTrick**: Control de precisión de cabeza con reducción de retroceso
- **Aim Lock**: Bloqueo de objetivo automático
- **Regedit**: Modificaciones de registro del juego
- **Aim Shot**: Asistencia de disparo automático
- **Aim-Head**: Objetivo específico a la cabeza con prioridad
- **Aimbot Drag**: Arrastre automático de objetivo
- **Sensitivity Slider**: Control de sensibilidad de puntería (Aim Assist + Sensitivity)
- **KSENSI VIP Button**: Lanzamiento directo al juego Free Fire con efectos de partículas

## 🚀 Tecnologías

### Web (Next.js)
- Next.js 15.5.4 con App Router
- TypeScript 5
- Tailwind CSS v4
- React 19
- Canvas API para efectos de partículas
- Deep linking multiplataforma
- PWA (Progressive Web App) con Service Worker
- API Routes para ejecución en segundo plano

### iOS (SwiftUI)
- SwiftUI para interfaz nativa
- Deep linking con múltiples esquemas URL
- Efectos de partículas con Canvas
- Manejo de errores y fallbacks
- Integración con archivo plist

### Android (Kotlin + Jetpack Compose)
- Jetpack Compose para UI moderna
- Intent handling para deep links
- Múltiples métodos de lanzamiento
- Integración con Play Store

## 📱 Deep Linking

La aplicación ejecuta comandos en segundo plano usando el esquema principal:

### Esquema Principal
- `com.dts.freefireth://` con parámetros específicos por función

### Esquemas Adicionales (iOS)
- `freefire://`
- `freefireth://`
- `freefiremax://`
- `com.dts.freefiremax://`
- `garena-freefire://`

### Android
- Paquetes: `com.dts.freefireth`, `com.dts.freefiremax`
- Intent schemes con fallback automático
- Redirección a Play Store si no está instalado

## 🎨 Diseño

- Fondo negro con partículas animadas (gris oscuro y blanco)
- Botón KSENSI VIP con partículas rojas y grises
- Toggles con estados visuales claros (gris claro cuando activo)
- Slider de sensibilidad personalizado
- Diseño compacto y responsive
- Todas las funciones inician desactivadas por defecto

## ⚙️ Configuración con Plist

El archivo `config/freefire-settings.plist` contiene todas las configuraciones del juego:

\`\`\`xml
- AimFov: 500
- Aimbot: true
- Box, Health, Name, Skeleton, Lines: true
- Telekill: true con distancia de 15
- SpeedHack, NinjaRun: configurables
- Y más opciones avanzadas
\`\`\`

Cada función lee y aplica automáticamente las configuraciones del plist.

## 📦 Instalación

### Opción 1: Instalación Rápida con shadcn CLI (Recomendado)
\`\`\`bash
npx shadcn@latest init freefire-assistant
cd freefire-assistant
npm run dev
\`\`\`

### Opción 2: Instalación Manual
\`\`\`bash
# Descomprimir el archivo ZIP
unzip freefire-assistant.zip
cd freefire-assistant

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
npm start
\`\`\`

### Instalación como PWA
1. Abrir la aplicación en el navegador
2. Hacer clic en "Instalar" cuando aparezca el prompt
3. La app se instalará en la pantalla de inicio
4. Funciona como aplicación nativa con acceso offline

### iOS Nativo
1. Abrir `native/ios/FreeFireLauncher.swift` en Xcode
2. Configurar Info.plist con los esquemas URL
3. Compilar y ejecutar

### Android Nativo
1. Abrir el proyecto en Android Studio
2. Sincronizar Gradle
3. Compilar y ejecutar

## 🔧 Estructura del Proyecto

\`\`\`
freefire-assistant/
├── app/
│   ├── api/execute/          # API para ejecución en segundo plano
│   ├── page.tsx              # Página principal
│   └── layout.tsx            # Layout con PWA
├── components/
│   ├── toggle-button.tsx     # Botones circulares
│   ├── toggle-switch.tsx     # Switches deslizantes
│   ├── sensitivity-slider.tsx # Slider de sensibilidad
│   ├── ksensi-vip-button.tsx # Botón principal con partículas
│   └── particles-background.tsx # Fondo animado
├── config/
│   └── freefire-settings.plist # Configuraciones del juego
├── lib/
│   ├── plist-parser.ts       # Parser del archivo plist
│   └── function-executor.ts  # Ejecutor de funciones
├── native/
│   ├── ios/                  # Código SwiftUI
│   └── android/              # Código Kotlin
└── public/
    ├── manifest.json         # Configuración PWA
    └── sw.js                 # Service Worker
\`\`\`

## 🎯 Funcionalidades Avanzadas

### Ejecución en Segundo Plano
- Todas las funciones se ejecutan sin redirigir a otras páginas
- API Routes manejan la lógica del servidor
- Scripts JavaScript reales se inyectan en `window.freefire`
- Cada función tiene variables específicas del plist

### Persistencia de Estado
- Los estados de las funciones se guardan en localStorage
- Al recargar la página, todas las funciones inician desactivadas
- El slider mantiene su valor entre sesiones

### Scripts por Función

**HeadTrick**: Reducción de retroceso 95%, aim assist, multiplicador de headshot 2.5x, sin lag, optimización ultra

**Aim Lock**: Bloqueo automático, tracking suave, predicción de movimiento

**Regedit**: Modificaciones de registro, optimización de rendimiento, ajustes de gráficos

**Aim Shot**: Disparo automático, detección de enemigos, timing perfecto

**Aim-Head**: Prioridad de cabeza 100%, shots al cuello, ajuste automático, boost crítico 2x

**Aimbot Drag**: Asistencia de arrastre, velocidad 0.95, compensación automática

## ⚠️ Notas Importantes

- Los deep links requieren que Free Fire esté instalado
- En iOS, los esquemas deben estar declarados en Info.plist
- En Android, se requieren permisos en AndroidManifest.xml
- La aplicación web funciona en todos los navegadores modernos
- Las funciones se ejecutan completamente en segundo plano
- El archivo plist es la fuente principal de configuración

## 📞 Contacto

Teléfono: (829) 327-8696

## 🔒 Seguridad

Las funciones se inyectan en el "analistics" del dispositivo tipo metadata para mayor seguridad. Todas las configuraciones se manejan localmente sin enviar datos a servidores externos.

## 📄 Licencia

Uso educativo y de demostración únicamente.
