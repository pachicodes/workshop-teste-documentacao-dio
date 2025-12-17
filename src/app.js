// Importa o framework Express para criar o servidor web
const express = require('express');

// Importa as rotas de iniciativas (endpoints da API)
const initiativesRoutes = require('./routes/initiatives');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Middleware que permite o servidor entender JSON no corpo das requisições
// Sem isso, não conseguiríamos ler dados enviados via POST ou PUT
app.use(express.json());

// Rota principal - quando alguém acessa a raiz da API
// Retorna uma mensagem de boas-vindas com os endpoints disponíveis
app.get('/', (req, res) => {
  res.json({
    message: 'Sustainability API',
    endpoints: {
      initiatives: '/api/initiatives'
    }
  });
});

// Conecta as rotas de iniciativas ao caminho /api/initiatives
// Todas as rotas definidas em initiativesRoutes serão acessíveis a partir desse caminho
app.use('/api/initiatives', initiativesRoutes);

// ===========================================
// INICIALIZAÇÃO DO SERVIDOR
// ===========================================
// Só inicia o servidor se este arquivo for executado diretamente (npm start)
// Se for importado para testes, não inicia o servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

// Exporta o app para ser usado nos testes de integração
module.exports = app;
