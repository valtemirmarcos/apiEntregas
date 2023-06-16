'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id',
          as:'userId'
        },
        onUpdate:'cascade',
        onDelete:'cascade'
      },
      numeroPedido: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      dadosRemetente: {
        type: Sequelize.STRING
      },
      dadosDestinatarios: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pedidos');
  }
};