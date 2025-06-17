Se divide en carpeta "back" para tener una mejor organización al momento de subir el proyecto a la nube de AWS.

El archivo Procfile (sin extensión) es necesario para que la plataforma de despligue sepa en qué archivo buscar la información (en nuestro caso "server.js")

Es necesario quitar la constante HOSTNAME y modificar el PORT para que reciba el puerto que Beanstalk configura automáticamente -> eso se logra con process.env.PORT

Es necesario también que mongoose sea una dependencia (no devDependencies)

En la carpeta "back" sombreo todos los archivos con el ratón -> click derecho -> comprimir en .zip -> asigno nombre identificatorio

Eso se sube a ElasticBeanstalk y tenemos el back montado

