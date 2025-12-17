# API de Sustentabilidade 🌱

Este projeto é uma API REST simples para gerenciar iniciativas de sustentabilidade, desenvolvido como exemplo educacional para o **Bootcamp GitHub Copilot – Código na Prática**, uma iniciativa da DIO em parceria com o GitHub.

## 📋 Sobre o Projeto

A API permite gerenciar diferentes tipos de iniciativas sustentáveis, como:
- Programas de reciclagem
- Ações ecológicas
- Metas de redução de carbono
- Projetos de impacto ambiental

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Jest** - Framework de testes
- **Supertest** - Biblioteca para testes de API HTTP
- Dados armazenados em memória (sem banco de dados)

## 📦 Instalação

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos para instalar

1. Clone este repositório:
```bash
git clone https://github.com/pachicodes/workshop-teste-documentacao-dio.git
```

2. Entre na pasta do projeto:
```bash
cd workshop-teste-documentacao-dio
```

3. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar

Para iniciar a API, execute:

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

## 🔗 Endpoints da API

### Listar todas as iniciativas
```
GET /api/initiatives
```

### Buscar uma iniciativa específica
```
GET /api/initiatives/:id
```

### Criar uma nova iniciativa
```
POST /api/initiatives
Content-Type: application/json

{
  "title": "Nome da Iniciativa",
  "type": "recycling",
  "description": "Descrição da iniciativa",
  "carbonReduction": 300,
  "status": "active"
}
```

### Atualizar uma iniciativa
```
PUT /api/initiatives/:id
Content-Type: application/json

{
  "title": "Novo título",
  "status": "completed"
}
```

### Deletar uma iniciativa
```
DELETE /api/initiatives/:id
```

## 📁 Estrutura do Projeto

```
workshop-teste-documentacao-dio/
├── src/
│   ├── app.js                    # Arquivo principal da aplicação
│   ├── routes/
│   │   └── initiatives.js        # Rotas da API
│   ├── services/
│   │   └── initiativesService.js # Lógica de negócio
│   └── __tests__/                # Testes automatizados
│       ├── initiativesService.test.js  # Testes unitários
│       └── api.test.js           # Testes de integração
├── package.json                  # Dependências do projeto
├── CONTRIBUTING.md               # Guia de contribuição
├── CODE_OF_CONDUCT.md            # Código de conduta
└── README.md                     # Documentação
```

## 💡 Exemplos de Uso

### Exemplo 1: Listar todas as iniciativas

**Requisição:**
```bash
curl http://localhost:3000/api/initiatives
```

**Resposta:**
```json
[
  {
    "id": "1",
    "title": "Programa de Reciclagem Comunitária",
    "type": "recycling",
    "description": "Coleta seletiva em bairros residenciais",
    "carbonReduction": 500,
    "status": "active"
  },
  {
    "id": "2",
    "title": "Reflorestamento Urbano",
    "type": "ecological",
    "description": "Plantio de árvores nativas em áreas urbanas",
    "carbonReduction": 1200,
    "status": "active"
  }
]
```

### Exemplo 2: Criar uma nova iniciativa

**Requisição:**
```bash
curl -X POST http://localhost:3000/api/initiatives \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Compostagem Comunitária",
    "type": "recycling",
    "description": "Transformação de resíduos orgânicos em adubo",
    "carbonReduction": 800,
    "status": "active"
  }'
```

**Resposta:**
```json
{
  "id": "3",
  "title": "Compostagem Comunitária",
  "type": "recycling",
  "description": "Transformação de resíduos orgânicos em adubo",
  "carbonReduction": 800,
  "status": "active"
}
```

## 📚 Aprendizados

Este projeto demonstra conceitos fundamentais de desenvolvimento de APIs:

- Criação de servidor HTTP com Express
- Roteamento de requisições
- Operações CRUD (Create, Read, Update, Delete)
- Organização de código em camadas (routes e services)
- Manipulação de dados em memória

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se à vontade para experimentar, modificar e aprender!

## 📄 Licença

Este projeto foi criado para fins educacionais no contexto do Bootcamp GitHub Copilot da DIO.

---

Desenvolvido com 💚 para o Bootcamp GitHub Copilot – Código na Prática
