'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entrega extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entrega.hasMany(models.Foto);
      Entrega.belongsTo(models.Pedido);
    }
  }
  Entrega.init({
    pedidoId: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    log: DataTypes.STRING,
    docId: DataTypes.INTEGER,
    nrDocumento: DataTypes.STRING,
    data_entrega: DataTypes.DATE,
    status: DataTypes.INTEGER,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Entrega',
  });
  return Entrega;
};