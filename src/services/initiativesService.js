let initiatives = [
  {
    id: '1',
    title: 'Programa de Reciclagem Comunitária',
    type: 'recycling',
    description: 'Coleta seletiva em bairros residenciais',
    carbonReduction: 500,
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

let nextId = 3;

const getAll = () => {
  return initiatives;
};

const getById = (id) => {
  return initiatives.find(i => i.id === id);
};

const create = (data) => {
  const newInitiative = {
    id: String(nextId++),
    ...data
  };
  initiatives.push(newInitiative);
  return newInitiative;
};

const update = (id, data) => {
  const index = initiatives.findIndex(i => i.id === id);
  if (index === -1) return null;
  
  initiatives[index] = {
    ...initiatives[index],
    ...data,
    id: id
  };
  return initiatives[index];
};

const remove = (id) => {
  const index = initiatives.findIndex(i => i.id === id);
  if (index === -1) return null;
  
  initiatives.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
