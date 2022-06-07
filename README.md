
# Tyba Backend Test

Las siguiens son las instrucciones de instalación de la API descritas paso a paso:

1. Se debe crear en la raíz del proyecto un archivo .env con los siguiensdatos:

```sh 
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=tyba-backend-test
ACCESS_TOKEN_SECRET=XwMZYtxvZu
REFRESH_TOKEN_SECRET=4jlZaRnKdp
```

2. Vaya a la consola de mongo escriba para usar la base de datos:

```sh 
use tyba-backend-test
```

3. Inserte en la consola de mongo los siguientes comandos en el mismo orden que se muestra:

**Nota:** El id del role de usuario es el que arroja como resultado el primer comando.
```sh 
db.roles.insertOne({ name: "master", permissions: ["/"] })

db.users.insertOne({ username: "myname", password: "$2a$10$kd3xqd2Ihg/Z7/rQRr729eaVbY1UwYVoK/1nAf1VTN4sWrxLF3.4O", email: "email@company.com", role: "629f915c7199281d46fc9694" })
```

4. Vaya a la raíz del proyecto en la consola y ejecute:
```sh 
node .
```

5. Los requests disponibles son:

- Para listar todos los restaurantes disponibles:
```sh 
GET http://localhost:8300/restaurant/list
```

- Para filtrar por locación los restaurantes:
```sh 
GET http://localhost:8300/restaurant/list?location=Abraham Adesanya
```

- Para listar los usuarios y sus transacciones:
```sh 
GET http://localhost:8300/transaction/list
```

- Para filtrar los usuarios y sus transacciones:
```sh 
GET http://localhost:8300/transaction/list?user=629f91a87199281d46fc9695
```

- Para hacer login:
```sh 
POST http://localhost:8300/auth/login
```

En este caso se debe envíar en el body del request el userna o email y el password.

- Para hacer refresh:
```sh 
http://localhost:8300/restaurant/list
```

6. La función de logout se da autométicamente después de 15 minutos, tiempo en el que expira el access token.