const express = require('express');
const router = express.Router();
const initiativesService = require('../services/initiativesService');

router.get('/', (req, res) => {
  const initiatives = initiativesService.getAll();
  res.json(initiatives);
});

router.get('/:id', (req, res) => {
  const initiative = initiativesService.getById(req.params.id);
  if (!initiative) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  res.json(initiative);
});

router.post('/', (req, res) => {
  const newInitiative = initiativesService.create(req.body);
  res.status(201).json(newInitiative);
});

router.put('/:id', (req, res) => {
  const updated = initiativesService.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const deleted = initiativesService.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Initiative not found' });
  }
  res.status(204).send();
});

module.exports = router;
