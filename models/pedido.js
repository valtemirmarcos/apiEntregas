'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedido.belongsTo(models.User);
      Pedido.hasOne(models.Entrega);
    }
  }
  Pedido.init({
    userId: DataTypes.INTEGER,
    numeroPedido: DataTypes.STRING,
    dadosRemetente: DataTypes.STRING,
    dadosDestinatarios: DataTypes.STRING,
    status:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};