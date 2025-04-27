# Sistema de Gestão Centralizada IKASA

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


📋 **Sobre o Projeto**  
Sistema centralizado desenvolvido para a IKASA, integrando funcionalidades dos setores de contabilidade e imobiliária em uma única plataforma.

---

🚀 **Tecnologias Utilizadas**
- React
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- TypeScript

---

⚙️ **Requisitos**
- Node.js (versão 18 ou superior)
- npm ou yarn

---

🛠️ **Instalação**

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Instale as dependências:
```bash
npm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

---

🏗️ **Estrutura do Projeto**

👥 **Níveis de Acesso**
- **Administrador:** Acesso completo ao sistema
- **Gerente:** Acesso a relatórios e aprovações
- **Operador:** Acesso para edição e inserção de dados
- **Visualizador:** Apenas visualização de dados

📱 **Módulos Principais**
- **Cadastros Básicos**
  - Gestão de pessoas
  - Gestão de imóveis
  - Cadastro de empresas
- **Gestão Financeira**
  - Contas a pagar
  - Sistema de cobranças
  - Conciliação bancária
- **Administração Imobiliária**
  - Gestão de contratos
  - Controle de locações
  - Gestão de pagamentos
- **Relatórios e Dashboards**
  - Painéis personalizáveis
  - Exportação de dados
  - Visualizações gráficas

---

🔒 **Segurança**
- Autenticação JWT com refresh tokens
- Proteção contra CSRF e XSS
- Sistema de permissões baseado em funções (RBAC)
- Logs de auditoria

---

📦 **Build de Produção**

Para gerar a build de produção:

```bash
npm run build
# ou
yarn build
```

---

🤝 **Contribuição**

1. Crie um fork do projeto
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Faça commit das mudanças:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Faça push para a branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request

---

📝 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para **IKASA**