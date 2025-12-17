// Importa o Express para criar as rotas
const express = require('express');

// Cria um roteador - permite agrupar rotas relacionadas
const router = express.Router();

// Importa o serviço que contém a lógica de negócio
const initiativesService = require('../services/initiativesService');

// ===========================================
// ROTAS DA API - Operações CRUD
// ===========================================

// GET /api/initiatives
// Lista todas as iniciativas
// Retorna: Array com todas as iniciativas cadastradas
router.get('/', (req, res) => {
  const initiatives = initiativesService.getAll();
  res.json(initiatives);
});

// GET /api/initiatives/:id
// Busca uma iniciativa específica pelo ID
// Parâmetro: id - identificador único da iniciativa
// Retorna: A iniciativa encontrada ou erro 404
router.get('/:id', (req, res) => {
  // req.params.id contém o valor passado na URL (ex: /api/initiatives/1)
  const initiative = initiativesService.getById(req.params.id);
  
  // Se não encontrar, retorna erro 404 (Not Found)
  if (!initiative) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  
  res.json(initiative);
});

// POST /api/initiatives
// Cria uma nova iniciativa
// Body: JSON com os dados da iniciativa (title, type, description, etc)
// Retorna: A iniciativa criada com status 201 (Created)
router.post('/', (req, res) => {
  // req.body contém os dados enviados no corpo da requisição
  const newInitiative = initiativesService.create(req.body);
  
  // Status 201 indica que um recurso foi criado com sucesso
  res.status(201).json(newInitiative);
});

// PUT /api/initiatives/:id
// Atualiza uma iniciativa existente
// Parâmetro: id - identificador da iniciativa a ser atualizada
// Body: JSON com os campos a serem atualizados
// Retorna: A iniciativa atualizada ou erro 404
router.put('/:id', (req, res) => {
  const updated = initiativesService.update(req.params.id, req.body);
  
  if (!updated) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  
  res.json(updated);
});

// DELETE /api/initiatives/:id
// Remove uma iniciativa
// Parâmetro: id - identificador da iniciativa a ser removida
// Retorna: Status 204 (No Content) em caso de sucesso ou erro 404
router.delete('/:id', (req, res) => {
  const deleted = initiativesService.remove(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  
  // Status 204 indica sucesso sem conteúdo para retornar
  res.status(204).send();
});

// Exporta o roteador para ser usado no app.js
module.exports = router;
