// ===========================================
// SERVIÇO DE INICIATIVAS
// ===========================================
// Este arquivo contém a lógica de negócio para gerenciar iniciativas.
// Os dados são armazenados em memória (array), ou seja,
// serão perdidos quando o servidor for reiniciado.
// Em um projeto real, usaríamos um banco de dados.

// "Banco de dados" em memória - array com iniciativas de exemplo
let initiatives = [
  {
    id: '1',
    title: 'Programa de Reciclagem Comunitária',
    type: 'recycling',
    description: 'Coleta seletiva em bairros residenciais',
    carbonReduction: 500,  // Redução de carbono em kg
    status: 'active'
  },
  {
    id: '2',
    title: 'Reflorestamento Urbano',
    type: 'ecological',
    description: 'Plantio de árvores nativas em áreas urbanas',
    carbonReduction: 1200,
    status: 'active'
  }
];

// Contador para gerar IDs únicos para novas iniciativas
let nextId = 3;

// ===========================================
// FUNÇÕES DO SERVIÇO (CRUD)
// ===========================================

/**
 * Retorna todas as iniciativas cadastradas
 * @returns {Array} Lista de todas as iniciativas
 */
const getAll = () => {
  return initiatives;
};

/**
 * Busca uma iniciativa pelo ID
 * @param {string} id - ID da iniciativa
 * @returns {Object|undefined} A iniciativa encontrada ou undefined
 */
const getById = (id) => {
  // find() percorre o array e retorna o primeiro elemento que satisfaz a condição
  return initiatives.find(i => i.id === id);
};

/**
 * Cria uma nova iniciativa
 * @param {Object} data - Dados da nova iniciativa
 * @returns {Object} A iniciativa criada com ID gerado
 */
const create = (data) => {
  const newInitiative = {
    id: String(nextId++),  // Converte o número para string e incrementa
    ...data                 // Spread operator: copia todas as propriedades de data
  };
  
  // Adiciona a nova iniciativa ao array
  initiatives.push(newInitiative);
  
  return newInitiative;
};

/**
 * Atualiza uma iniciativa existente
 * @param {string} id - ID da iniciativa a ser atualizada
 * @param {Object} data - Novos dados para atualizar
 * @returns {Object|null} A iniciativa atualizada ou null se não encontrada
 */
const update = (id, data) => {
  // findIndex() retorna a posição do elemento no array (-1 se não encontrar)
  const index = initiatives.findIndex(i => i.id === id);
  
  // Se não encontrou, retorna null
  if (index === -1) return null;
  
  // Atualiza a iniciativa mesclando os dados antigos com os novos
  initiatives[index] = {
    ...initiatives[index],  // Mantém os dados existentes
    ...data,                // Sobrescreve com os novos dados
    id: id                  // Garante que o ID não seja alterado
  };
  
  return initiatives[index];
};

/**
 * Remove uma iniciativa
 * @param {string} id - ID da iniciativa a ser removida
 * @returns {boolean|null} true se removida, null se não encontrada
 */
const remove = (id) => {
  const index = initiatives.findIndex(i => i.id === id);
  
  if (index === -1) return null;
  
  // splice() remove elementos do array
  // Parâmetros: posição inicial, quantidade de elementos a remover
  initiatives.splice(index, 1);
  
  return true;
};

// Exporta as funções para serem usadas em outros arquivos
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
