import Sequelize, { Model } from 'sequelize';

export default class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        type: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O tipo da conta é obrigatório',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A descrição da conta é obrigatória',
            },
          },
        },
        value: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O valor da conta é obrigatório',
            },
          },
        },
        transaction_date: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A data de lançamento é obrigatória',
            },
            isDate: {
              msg: 'A data fornecida não é uma data válida',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('afterSave', async (account) => {
      const user = await account.getUser();
      const accounts = await Account.findAll({
        where: { user_id: user.id },
      });
      const totalAccount = accounts.reduce((acc, { value }) => acc + value, 0);
      await user.update({ total_account: totalAccount });
    });

    this.addHook('afterDestroy', async (account) => {
      const user = await account.getUser();
      const accounts = await Account.findAll({
        where: { user_id: user.id },
      });
      const totalAccount = accounts.reduce((acc, { value }) => acc + value, 0);
      await user.update({ total_account: totalAccount });
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
