No te olvides de tirar un npm install por las dudas

En environment.ts configuramos que llame a localhost si lo corremos en nuestra pc o que, al momento de buildearla para Amplify, cambie a la api de ApiGateway

Es necesario revisar angular.json y asegurarse de tener estas lineas
"fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
dentro de projects -> "nombre" -> architect -> build -> configurations -> production
Con eso le decimos a vscode que al momento de configurar la producción reemplace los environments.ts

Una vez hacemos el ng build --configuration production, va a tomar la variable de entorno de prod y nos va a generar la carpeta "dist"

Dentro de esa carpeta hay otra llamada "browser", hacemos lo mismo que con la carpeta de back para Beanstalk: sombreamos todo con el mouse -> click derecho -> convertir en zip -> asignamos nombre

Eso lo subimos a Amplify

(Tip: Extrema atención en ApiGateway al CORS y a las rutas. Esas cosas mal configuradas rompen todo el proyecto)