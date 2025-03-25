![Thumbnail](/public/thumbnail.png)

# 🐍 CaseCobra Brasil

🚀 Uma loja online de capinhas personalizadas! Faça upload da sua imagem, visualize o preview e finalize sua compra com segurança.

## 📌 Tecnologias Utilizadas

- **Next.js** (React + TypeScript) - Framework principal da aplicação
- **Prisma** - ORM para comunicação com o banco de dados
- **Neon** - Banco de dados PostgreSQL na nuvem
- **Kinde** - Autenticação e gerenciamento de usuários
- **UploadThing** - Armazenamento de imagens
- **Stripe** - Processamento de pagamentos

## 📸 Demonstração

### Landing Page

![Landing Page](/public/Home.png)

### Drag your image

![Drag and drop zone](/public/DragnDrop.png)

### Customize your case

![Customize](/public/Customize.png)

### Be happy!

![Finish page](/public/beHappy.png)

## 📦 Funcionalidades

### 🛒 Loja Online
- Upload de imagem personalizada para a capinha
- Ajuste e posicionamento da imagem
- Visualização do preview antes da compra
- Checkout seguro com Stripe
- Envio de e-mail de confirmação após a compra

### 📊 Dashboard do Administrador
- Exibição do total de vendas semanal e mensal
- Definição de metas de vendas
- Listagem de pedidos com possibilidade de atualização de status

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/casecobra-brasil.git
   ```

2. Acesse a pasta do projeto:
   ```sh
   cd casecobra-brasil
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
   ```env
   DATABASE_URL= "sua-url-do-neon"
   NEXT_PUBLIC_KINDE_CLIENT_ID= "seu-client-id"
   NEXT_PUBLIC_KINDE_ISSUER_URL= "seu-issuer-url"
   UPLOADTHING_SECRET= "sua-chave-uploadthing"
   STRIPE_SECRET_KEY= "sua-chave-stripe"
   ```

5. Execute as migrações do banco de dados:
   ```sh
   npx prisma migrate dev
   ```

6. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

   O projeto estará rodando em `http://localhost:3000`

## 📜 Licença

Este projeto basea-se nas aulas de Josh Tried Coding [Youtube](https://www.youtube.com/@joshtriedcoding).

---

💡 _Caso tenha sugestões ou queira contribuir, fique à vontade para abrir uma issue ou um pull request!_
