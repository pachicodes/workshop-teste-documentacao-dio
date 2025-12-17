// ===========================================
// TESTES DE INTEGRAÇÃO - ENDPOINTS DA API
// ===========================================
// Este arquivo testa os endpoints HTTP da API.
// Diferente dos testes unitários (que testam funções isoladas),
// os testes de integração testam o fluxo completo:
// Requisição HTTP → Rota → Serviço → Resposta
//
// Usamos o Supertest para simular requisições HTTP sem precisar
// iniciar o servidor de verdade.

// Importa o Supertest - biblioteca para testar APIs HTTP
const request = require('supertest');

// Importa o app Express (sem iniciar o servidor)
const app = require('../app');

// Importa o serviço para manipular dados nos testes
const initiativesService = require('../services/initiativesService');

describe('API Endpoints - Initiatives', () => {

  // ===========================================
  // PREPARAÇÃO DOS TESTES
  // ===========================================
  
  // Variável para guardar o ID de uma iniciativa criada nos testes
  let testInitiativeId;

  // beforeEach() - Executa ANTES de cada teste
  // Reseta o banco de dados em memória para garantir testes independentes
  beforeEach(() => {
    // Limpa todas as iniciativas existentes
    const all = initiativesService.getAll();
    while (all.length > 0) {
      initiativesService.remove(all[0].id);
    }
    
    // Cria uma iniciativa de teste
    const created = initiativesService.create({
      title: 'Iniciativa de Teste',
      type: 'recycling',
      description: 'Descrição para testes',
      carbonReduction: 100,
      status: 'active'
    });
    
    // Guarda o ID para usar nos testes
    testInitiativeId = created.id;
  });

  // ===========================================
  // TESTE DA ROTA PRINCIPAL
  // ===========================================
  
  describe('GET /', () => {
    it('deve retornar mensagem de boas-vindas', async () => {
      // request(app) cria uma requisição de teste
      // .get('/') faz uma requisição GET para a rota /
      // .expect(200) verifica se o status HTTP é 200 (OK)
      const response = await request(app)
        .get('/')
        .expect(200);
      
      // Verifica o conteúdo da resposta
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Sustainability API');
    });
  });

  // ===========================================
  // TESTES DE LISTAGEM (GET /api/initiatives)
  // ===========================================
  
  describe('GET /api/initiatives', () => {
    it('deve retornar lista de iniciativas com status 200', async () => {
      const response = await request(app)
        .get('/api/initiatives')
        .expect(200);  // Status 200 = OK
      
      // Verifica se retornou um array
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar Content-Type JSON', async () => {
      const response = await request(app)
        .get('/api/initiatives')
        .expect('Content-Type', /json/);  // Regex para verificar se contém 'json'
    });
  });

  // ===========================================
  // TESTES DE BUSCA POR ID (GET /api/initiatives/:id)
  // ===========================================
  
  describe('GET /api/initiatives/:id', () => {
    it('deve retornar uma iniciativa existente com status 200', async () => {
      const response = await request(app)
        .get(`/api/initiatives/${testInitiativeId}`)
        .expect(200);
      
      // Verifica se os dados estão corretos
      expect(response.body.id).toBe(testInitiativeId);
      expect(response.body.title).toBe('Iniciativa de Teste');
    });

    it('deve retornar status 404 quando ID não existe', async () => {
      const response = await request(app)
        .get('/api/initiatives/id-que-nao-existe')
        .expect(404);  // Status 404 = Not Found
      
      // Verifica se retornou mensagem de erro
      expect(response.body).toHaveProperty('error');
    });
  });

  // ===========================================
  // TESTES DE CRIAÇÃO (POST /api/initiatives)
  // ===========================================
  
  describe('POST /api/initiatives', () => {
    it('deve criar uma nova iniciativa com status 201', async () => {
      const newInitiative = {
        title: 'Nova Iniciativa via API',
        type: 'ecological',
        description: 'Criada através do teste de integração',
        carbonReduction: 500,
        status: 'active'
      };

      const response = await request(app)
        .post('/api/initiatives')
        .send(newInitiative)  // .send() envia dados no corpo da requisição
        .expect(201);  // Status 201 = Created
      
      // Verifica se a iniciativa foi criada com ID
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Nova Iniciativa via API');
    });

    it('deve adicionar a iniciativa na lista após criação', async () => {
      const newInitiative = {
        title: 'Iniciativa para Verificar Lista',
        type: 'recycling',
        description: 'Teste',
        carbonReduction: 200,
        status: 'active'
      };

      // Cria a iniciativa
      const createResponse = await request(app)
        .post('/api/initiatives')
        .send(newInitiative)
        .expect(201);
      
      // Busca a iniciativa criada
      const getResponse = await request(app)
        .get(`/api/initiatives/${createResponse.body.id}`)
        .expect(200);
      
      expect(getResponse.body.title).toBe('Iniciativa para Verificar Lista');
    });
  });

  // ===========================================
  // TESTES DE ATUALIZAÇÃO (PUT /api/initiatives/:id)
  // ===========================================
  
  describe('PUT /api/initiatives/:id', () => {
    it('deve atualizar uma iniciativa existente com status 200', async () => {
      const updateData = {
        title: 'Título Atualizado via API',
        status: 'completed'
      };

      const response = await request(app)
        .put(`/api/initiatives/${testInitiativeId}`)
        .send(updateData)
        .expect(200);
      
      // Verifica se os dados foram atualizados
      expect(response.body.title).toBe('Título Atualizado via API');
      expect(response.body.status).toBe('completed');
      // ID não deve mudar
      expect(response.body.id).toBe(testInitiativeId);
    });

    it('deve retornar status 404 ao atualizar ID inexistente', async () => {
      const response = await request(app)
        .put('/api/initiatives/id-inexistente')
        .send({ title: 'Teste' })
        .expect(404);
      
      expect(response.body).toHaveProperty('error');
    });
  });

  // ===========================================
  // TESTES DE REMOÇÃO (DELETE /api/initiatives/:id)
  // ===========================================
  
  describe('DELETE /api/initiatives/:id', () => {
    it('deve remover uma iniciativa com status 204', async () => {
      await request(app)
        .delete(`/api/initiatives/${testInitiativeId}`)
        .expect(204);  // Status 204 = No Content (sucesso sem retorno)
    });

    it('deve retornar 404 ao buscar iniciativa removida', async () => {
      // Primeiro remove
      await request(app)
        .delete(`/api/initiatives/${testInitiativeId}`)
        .expect(204);
      
      // Depois tenta buscar - deve dar 404
      await request(app)
        .get(`/api/initiatives/${testInitiativeId}`)
        .expect(404);
    });

    it('deve retornar status 404 ao remover ID inexistente', async () => {
      await request(app)
        .delete('/api/initiatives/id-inexistente')
        .expect(404);
    });
  });

  // ===========================================
  // TESTES DE FLUXO COMPLETO (CRUD)
  // ===========================================
  
  describe('Fluxo Completo CRUD', () => {
    it('deve executar o ciclo completo: criar, ler, atualizar, deletar', async () => {
      // 1. CRIAR (Create)
      const createResponse = await request(app)
        .post('/api/initiatives')
        .send({
          title: 'Iniciativa Ciclo Completo',
          type: 'ecological',
          description: 'Testando fluxo CRUD',
          carbonReduction: 300,
          status: 'active'
        })
        .expect(201);
      
      const createdId = createResponse.body.id;
      expect(createResponse.body.title).toBe('Iniciativa Ciclo Completo');

      // 2. LER (Read)
      const readResponse = await request(app)
        .get(`/api/initiatives/${createdId}`)
        .expect(200);
      
      expect(readResponse.body.title).toBe('Iniciativa Ciclo Completo');

      // 3. ATUALIZAR (Update)
      const updateResponse = await request(app)
        .put(`/api/initiatives/${createdId}`)
        .send({ status: 'completed', carbonReduction: 350 })
        .expect(200);
      
      expect(updateResponse.body.status).toBe('completed');
      expect(updateResponse.body.carbonReduction).toBe(350);

      // 4. DELETAR (Delete)
      await request(app)
        .delete(`/api/initiatives/${createdId}`)
        .expect(204);

      // 5. VERIFICAR que foi deletado
      await request(app)
        .get(`/api/initiatives/${createdId}`)
        .expect(404);
    });
  });

});
