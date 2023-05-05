Comandos:

- yarn init -y
- yarn add typescript @types/express ts-node-dev -D
- yarn add express
- yarn add @types/node -D
- tsc -init
  - strict : false
Montar a estrutura src/server.ts
import express from 'express'

const app = express()

app.listen(3000, ()=> console.log('Server is running at port 3000'))
Criar script no package.json: "dev": "ts-node-dev src/server.ts"
- yarn dev

https://www.prisma.io/docs/getting-started/quickstart

- yarn add prisma -D
- yarn add @prisma/client
- yarn prisma init (criar o prisma/schema.prisma e o arquivo .env)
* Configurar banco de dados
Por padrão o .env vem pre configurado com dados do postgres
- yarn prisma generate
- yarn prisma migrate dev - passar o nome da migration
***√ Enter a name for the new migration: ... users
Applying migration `20230504214735_users`***
Necessário alterar o nome da tabela @@map("users") - dentro do schema.prisma
***√ Enter a name for the new migration: ... users
Applying migration `20230504214918_users`***
- yarn add bcryptjs
- yarn add @types/bcryptjs -D
- yarn add express-async-errors - Para tratar os erros
- yarn add jsonwebtoken
- yarn add @types/jsonwebtoken -D
- yarn add dotenv
- yarn add dayjs

yarn prisma db pull
