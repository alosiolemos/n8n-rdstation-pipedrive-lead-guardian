const leads = $('Lista todos os leads').item.json.data;
const usuarios = $('Obter usuários').item.json.data;

// cria mapa de usuários
const userMap = {};
usuarios.forEach(user => {
  userMap[user.id] = {
    owner_name: user.name,
    owner_email: user.email
  };
});

// aplica filtro
const filtrados = leads.filter(lead =>
  (lead.source_name || '') !== 'Manually created' &&
  (lead.origin || '') !== 'ManuallyCreated'
);

// limpa e cruza os dados
const resultado = filtrados.map(lead => ({
  add_time: lead.add_time,
  owner_name: userMap[lead.owner_id]?.owner_name || null,
  owner_email: userMap[lead.owner_id]?.owner_email || null,
  id: lead.id,
  title: lead.title,
  owner_id: lead.owner_id,
  source_name: lead.source_name
}));

return [
  {
    json: {
      body: resultado
    }
  }
];
