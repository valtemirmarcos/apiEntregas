const { Sequelize } = require('sequelize');
const Umzug = require('umzug');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('appEntregas', 'valtemir', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Instancie o objeto Umzug para gerenciar as migrations
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  },
  migrations: {
    path: '/home/valtemir/Documentos/curso_expressJS/apiEntregas/migrations', // Caminho para o diretório das migrations
    params: [sequelize.getQueryInterface(), Sequelize] // Parâmetros adicionais para as migrations
  }
});

// Função para remover as tabelas e criar novamente usando migrations
async function resetDatabase() {
  try {
    // Desfaz todas as migrations
    await umzug.down({ to: 0 });

    // Executa todas as migrations novamente
    await umzug.up();

    console.log('Tabelas removidas e criadas novamente com sucesso!');
  } catch (error) {
    console.error('Erro ao redefinir o banco de dados:', error);
  } finally {
    // Encerre a conexão com o banco de dados
    await sequelize.close();
  }
}

// Chame a função para redefinir o banco de dados
resetDatabase();