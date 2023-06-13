'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Entregas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Pedidos',
          key:'id',
          as:'pedidoId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      lat: {
        type: Sequelize.STRING(20)
      },
      log: {
        type: Sequelize.STRING(20)
      },
      docId: {
        type: Sequelize.INTEGER
      },
      nrDocumento: {
        type: Sequelize.STRING(50)
      },
      data_entrega: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Entregas');
  }
};