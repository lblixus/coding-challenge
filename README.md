# 📱Take-home Coding Challenge

Bienvenido a mi Expo creado con [create-expo-app](https://www.npmjs.com/package/create-expo-app), una herramienta de desarrollo rápida y eficaz para aplicaciones móviles.

## 🛠️ Instalación de dependencias

Para empezar, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Una vez que tengas Node.js, sigue estos pasos para instalar las dependencias:

1. Clona el repositorio del proyecto y navega a la carpeta del proyecto:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## 🚀 Ejecución del proyecto

Inicia la aplicación en modo de desarrollo con el siguiente comando:

```bash
npx expo start -c
```

La opción `-c` asegura que se limpie el caché, eliminando posibles conflictos en las actualizaciones de código.

Al ejecutar este comando, Expo te dará opciones para ver la aplicación en:

- **Desarrollo en tu dispositivo móvil** con [Expo Go](https://expo.dev/client) escaneando el código QR.
- **Emulador de Android** si tienes Android Studio instalado ([configuración](https://docs.expo.dev/workflow/android-studio-emulator/)).
- **Simulador de iOS** en macOS con Xcode ([configuración](https://docs.expo.dev/workflow/ios-simulator/)).

> **Nota:** Asegúrate de tener el emulador de tu preferencia en ejecución para conectarlo correctamente con Expo.

## 📂 Estructura del proyecto

El desarrollo principal se realiza dentro de la carpeta **app**, donde podrás encontrar las rutas y componentes de la aplicación. Este proyecto utiliza **file-based routing** para gestionar la navegación, facilitando la organización del código.

## 🔄 Reiniciar el proyecto

Si deseas limpiar el proyecto y comenzar desde una base en blanco, puedes ejecutar el siguiente comando:

```bash
npm run reset-project
```

Este comando moverá el código base a una carpeta llamada **app-example** y generará una nueva carpeta **app** vacía, lista para que comiences a desarrollar desde cero.

## 📚 Recursos y documentación

Para aprender más sobre el desarrollo con Expo, te recomiendo estos recursos:

- 📄 [Documentación de Expo](https://docs.expo.dev/)
- 📖 [Tutorial de introducción a Expo](https://docs.expo.dev/tutorial/introduction/)

## 🌐 Comunidad

Únete a la comunidad de Expo para obtener ayuda, compartir tus proyectos o colaborar en código abierto.

- [Expo en GitHub](https://github.com/expo/expo): Contribuye y explora el código fuente de Expo.
- [Discord de Expo](https://chat.expo.dev): Participa en discusiones y recibe ayuda de otros desarrolladores.

## Take-home Coding Challenge

Este proyecto es un Take-home Coding Challenge.

## Accesibilidad

Para mejorar la experiencia del usuario, hemos implementado prácticas de accesibilidad en la elección de colores, contrastes y tamaño de los elementos en pantalla. lo ideal sera ejecutar escaneos con alguna herramienta completo para garantizar que la app cumpla con los estándares requeridos. se incorporo el framework Tailwind

## App Android/IOS

se genero la aplicación para que pueda ser visualizado tanto en web como en devices,
