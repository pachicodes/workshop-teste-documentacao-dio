# Guia de Contribuição 🤝

Obrigado pelo interesse em contribuir com este projeto! Este guia vai te ajudar a fazer sua primeira contribuição.

## 📋 Índice

- [Primeiros Passos](#-primeiros-passos)
- [Como Contribuir](#-como-contribuir)
- [Padrões do Projeto](#-padrões-do-projeto)
- [Enviando sua Contribuição](#-enviando-sua-contribuição)
- [Dúvidas Frequentes](#-dúvidas-frequentes)

## 🚀 Primeiros Passos

### 1. Faça um Fork do Repositório

Clique no botão "Fork" no canto superior direito da página do GitHub para criar uma cópia do projeto na sua conta.

### 2. Clone o Repositório

```bash
git clone https://github.com/SEU-USUARIO/workshop-teste-documentacao-dio.git
cd workshop-teste-documentacao-dio
```

### 3. Instale as Dependências

```bash
npm install
```

### 4. Crie uma Branch para sua Alteração

```bash
git checkout -b minha-contribuicao
```

> 💡 **Dica:** Use nomes descritivos para sua branch, como `feature/novo-endpoint` ou `fix/corrigir-validacao`

## 🎯 Como Contribuir

### Tipos de Contribuição

Você pode contribuir de várias formas:

| Tipo | Descrição |
|------|-----------|
| 🐛 **Bug Fix** | Corrigir um erro no código |
| ✨ **Feature** | Adicionar uma nova funcionalidade |
| 📝 **Documentação** | Melhorar ou adicionar documentação |
| 🎨 **Refatoração** | Melhorar o código sem mudar funcionalidade |
| 🧪 **Testes** | Adicionar ou melhorar testes |

### Ideias para Contribuir

Se você não sabe por onde começar, aqui vão algumas sugestões:

- [ ] Adicionar validação de dados nos endpoints
- [ ] Criar novos tipos de iniciativas
- [ ] Melhorar mensagens de erro
- [ ] Adicionar filtros na listagem (por tipo, status)
- [ ] Criar endpoint de estatísticas
- [ ] Melhorar a documentação

## 📐 Padrões do Projeto

### Estrutura de Pastas

```
src/
├── app.js          # Configuração do servidor
├── routes/         # Definição das rotas
└── services/       # Lógica de negócio
```

### Estilo de Código

- Use **camelCase** para variáveis e funções
- Use **aspas simples** para strings
- Adicione **ponto e vírgula** no final das linhas
- Use **2 espaços** para indentação

**Exemplo:**
```javascript
const minhaFuncao = (parametro) => {
  const resultado = parametro + 1;
  return resultado;
};
```

### Commits

Escreva mensagens de commit claras e descritivas:

```bash
# ✅ Bom
git commit -m "Adiciona validação de campos obrigatórios"
git commit -m "Corrige erro ao deletar iniciativa inexistente"

# ❌ Evite
git commit -m "fix"
git commit -m "alterações"
```

## 📤 Enviando sua Contribuição

### 1. Certifique-se que o Código Funciona

```bash
npm start
```

Teste manualmente os endpoints para garantir que tudo está funcionando.

### 2. Faça Commit das Alterações

```bash
git add .
git commit -m "Descrição clara da sua alteração"
```

### 3. Envie para o GitHub

```bash
git push origin minha-contribuicao
```

### 4. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "Pull Requests" > "New Pull Request"
3. Selecione sua branch
4. Descreva suas alterações
5. Clique em "Create Pull Request"

### Modelo de Pull Request

```markdown
## Descrição
Descreva o que foi alterado e por quê.

## Tipo de Alteração
- [ ] Bug fix
- [ ] Nova feature
- [ ] Documentação
- [ ] Refatoração

## Como Testar
Passos para testar a alteração:
1. Execute `npm start`
2. Acesse o endpoint X
3. Verifique o resultado Y

## Screenshots (se aplicável)
Adicione prints se necessário.
```

## ❓ Dúvidas Frequentes

### Como atualizar meu fork?

```bash
# Adicione o repositório original como remote
git remote add upstream https://github.com/pachicodes/workshop-teste-documentacao-dio.git

# Busque as atualizações
git fetch upstream

# Atualize sua branch main
git checkout main
git merge upstream/main

# Atualize sua branch de trabalho
git checkout minha-contribuicao
git rebase main
```

### Meu Pull Request foi rejeitado, e agora?

Não desanime! Leia o feedback, faça os ajustes necessários e envie novamente. Contribuir com open source é um processo de aprendizado.

### Posso contribuir mesmo sendo iniciante?

**Sim, com certeza!** Este projeto foi feito para aprendizado. Contribuições de todos os níveis são bem-vindas. Se tiver dúvidas, pergunte!

## 🌟 Reconhecimento

Todos os contribuidores serão reconhecidos! Agradecemos seu tempo e esforço em melhorar este projeto.

---

Feito com 💚 pela comunidade do Bootcamp GitHub Copilot – DIO
