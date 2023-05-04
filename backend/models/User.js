import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O nome é obrigatório.',
          },
          len: {
            args: [3, 255],
            msg: 'O nome deve conter entre 3 e 255 caracteres.',
          },
        },
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O salário é obrigatório',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: 'Email já cadastrado.',
        },
        validate: {
          notNull: {
            msg: 'o email é obrigatório',
          },
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A senha é obrigatória',
          },
          len: {
            args: [8, 36],
            msg: 'A senha deve conter entre 8 e 36 caracteres.',
          },
        },
      },
      total_account: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: 'user_id' });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
