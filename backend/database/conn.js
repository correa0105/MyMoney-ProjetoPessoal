import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Account from '../models/Account';

export default class Connection {
  constructor() {
    this.sequelize = new Sequelize(databaseConfig);
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Conectado com sucesso!');
    } catch (err) {
      console.log('Não foi possivel conectarse ao banco de dados...', err);
    }
  }

  async syncModels() {
    try {
      User.init(this.sequelize);
      Account.init(this.sequelize);
      User.associate(this.sequelize.models);
      Account.associate(this.sequelize.models);

      await this.sequelize.sync();
      console.log('Tabelas sincronizadas');
    } catch (err) {
      console.log('Não foi possivel sincronizar as tabelas...', err);
    }
  }
}
