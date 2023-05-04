import Sequelize from 'sequelize';

import User from '../models/User';
import Account from '../models/Account';

import getToken from '../helpers/getToken';
import getUserByToken from '../helpers/getUserByToken';

class UserController {
  async store(req, res) {
    try {
      const { confirmpassword } = req.body;
      const { password } = req.body;

      if (confirmpassword !== password) {
        return res.status(400).json({
          errors: ['As senhas não conferem.'],
        });
      }

      const newUser = await User.create(req.body);

      return res.json({
        id: newUser.id,
        name: newUser.name,
        total_account: newUser.total_account,
        email: newUser.email,
        salary: newUser.salary,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      const totals = await Account.findAll({
        attributes: ['type', [Sequelize.fn('SUM', Sequelize.col('value')), 'total']],
        where: {
          user_id: user.id,
        },
        group: ['type'],
      });

      const result = {
        user: {
          id: user.id,
          name: user.name,
          total_account: user.total_account,
          email: user.email,
          salary: user.salary,
        },
        accounts: {},
      };

      totals.forEach((item) => {
        result.accounts[item.type.toLowerCase()] = item.dataValues.total;
      });

      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado!'],
        });
      }

      const attUser = await user.update(req.body);
      const {
        id, name, email, salary, total_account,
      } = attUser;

      return res.json({
        msg: 'Dados atualizados com sucesso!',
        user: {
          id, name, email, salary, total_account,
        },
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    try {
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado!'],
        });
      }

      await user.destroy();

      return res.json({
        msg: 'Usuário removido com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
