// ===========================================
// TESTES DO SERVIÇO DE INICIATIVAS
// ===========================================
// Este arquivo contém os testes unitários para o initiativesService.
// Usamos o Jest como framework de testes.
//
// Para rodar os testes:
//   npm test           - Executa todos os testes uma vez
//   npm run test:watch - Executa os testes e fica observando mudanças
//   npm run test:coverage - Mostra relatório de cobertura de código

// Importa o serviço que vamos testar
const initiativesService = require('../services/initiativesService');

// ===========================================
// ESTRUTURA DOS TESTES
// ===========================================
// describe() - Agrupa testes relacionados
// it() ou test() - Define um caso de teste individual
// expect() - Faz as verificações (assertions)

describe('Initiatives Service', () => {
  
  // beforeEach() - Executa antes de CADA teste
  // Útil para resetar o estado e garantir que cada teste seja independente
  beforeEach(() => {
    // Limpa as iniciativas e recria os dados iniciais
    // Isso garante que cada teste comece com o mesmo estado
    const all = initiativesService.getAll();
    while (all.length > 0) {
      initiativesService.remove(all[0].id);
    }
    
    // Recria dados de teste
    initiativesService.create({
      title: 'Teste Reciclagem',
      type: 'recycling',
      description: 'Descrição teste',
      carbonReduction: 100,
      status: 'active'
    });
  });

  // ===========================================
  // TESTES DE LEITURA (GET)
  // ===========================================
  
  describe('getAll()', () => {
    it('deve retornar um array de iniciativas', () => {
      // Arrange & Act (Preparar e Executar)
      const result = initiativesService.getAll();
      
      // Assert (Verificar)
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('deve retornar iniciativas com as propriedades corretas', () => {
      const result = initiativesService.getAll();
      const initiative = result[0];
      
      // Verifica se a iniciativa tem todas as propriedades esperadas
      expect(initiative).toHaveProperty('id');
      expect(initiative).toHaveProperty('title');
      expect(initiative).toHaveProperty('type');
      expect(initiative).toHaveProperty('description');
      expect(initiative).toHaveProperty('carbonReduction');
      expect(initiative).toHaveProperty('status');
    });
  });

  describe('getById()', () => {
    it('deve retornar uma iniciativa quando o ID existe', () => {
      // Primeiro, pegamos uma iniciativa existente
      const all = initiativesService.getAll();
      const existingId = all[0].id;
      
      // Buscamos pelo ID
      const result = initiativesService.getById(existingId);
      
      // Verificamos se encontrou
      expect(result).toBeDefined();
      expect(result.id).toBe(existingId);
    });

    it('deve retornar undefined quando o ID não existe', () => {
      const result = initiativesService.getById('id-inexistente');
      
      // undefined significa que não encontrou
      expect(result).toBeUndefined();
    });
  });

  // ===========================================
  // TESTES DE CRIAÇÃO (POST)
  // ===========================================
  
  describe('create()', () => {
    it('deve criar uma nova iniciativa com ID gerado', () => {
      const newData = {
        title: 'Nova Iniciativa',
        type: 'ecological',
        description: 'Descrição da nova iniciativa',
        carbonReduction: 200,
        status: 'active'
      };
      
      const result = initiativesService.create(newData);
      
      // Verifica se a iniciativa foi criada corretamente
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Nova Iniciativa');
      expect(result.type).toBe('ecological');
    });

    it('deve adicionar a iniciativa na lista', () => {
      const countBefore = initiativesService.getAll().length;
      
      initiativesService.create({
        title: 'Mais Uma Iniciativa',
        type: 'recycling',
        description: 'Descrição',
        carbonReduction: 50,
        status: 'active'
      });
      
      const countAfter = initiativesService.getAll().length;
      
      // A lista deve ter um item a mais
      expect(countAfter).toBe(countBefore + 1);
    });
  });

  // ===========================================
  // TESTES DE ATUALIZAÇÃO (PUT)
  // ===========================================
  
  describe('update()', () => {
    it('deve atualizar uma iniciativa existente', () => {
      const all = initiativesService.getAll();
      const existingId = all[0].id;
      
      const result = initiativesService.update(existingId, {
        title: 'Título Atualizado',
        status: 'completed'
      });
      
      // Verifica se atualizou corretamente
      expect(result.title).toBe('Título Atualizado');
      expect(result.status).toBe('completed');
      // O ID não deve mudar
      expect(result.id).toBe(existingId);
    });

    it('deve manter os campos não atualizados', () => {
      const all = initiativesService.getAll();
      const existing = all[0];
      
      const result = initiativesService.update(existing.id, {
        title: 'Novo Título'
      });
      
      // O campo description não foi atualizado, deve permanecer igual
      expect(result.description).toBe(existing.description);
    });

    it('deve retornar null quando o ID não existe', () => {
      const result = initiativesService.update('id-inexistente', {
        title: 'Teste'
      });
      
      expect(result).toBeNull();
    });
  });

  // ===========================================
  // TESTES DE REMOÇÃO (DELETE)
  // ===========================================
  
  describe('remove()', () => {
    it('deve remover uma iniciativa existente', () => {
      const all = initiativesService.getAll();
      const existingId = all[0].id;
      const countBefore = all.length;
      
      const result = initiativesService.remove(existingId);
      const countAfter = initiativesService.getAll().length;
      
      // Deve retornar true e reduzir a quantidade
      expect(result).toBe(true);
      expect(countAfter).toBe(countBefore - 1);
    });

    it('deve retornar null quando o ID não existe', () => {
      const result = initiativesService.remove('id-inexistente');
      
      expect(result).toBeNull();
    });

    it('a iniciativa removida não deve mais ser encontrada', () => {
      const all = initiativesService.getAll();
      const existingId = all[0].id;
      
      initiativesService.remove(existingId);
      
      const searchResult = initiativesService.getById(existingId);
      expect(searchResult).toBeUndefined();
    });
  });

});
