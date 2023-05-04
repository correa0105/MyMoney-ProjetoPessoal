import { Op } from 'sequelize';

import Account from '../models/Account';

import getToken from '../helpers/getToken';
import getUserByToken from '../helpers/getUserByToken';

class AccountController {
  async store(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    let valueFormated;

    if (req.body.value) {
      valueFormated = req.body.value.replace(',', '.');
    }

    const accountBody = {
      type: req.body.type,
      description: req.body.description,
      transaction_date: req.body.transaction_date,
      value: valueFormated,
      user_id: user.dataValues.id,
    };

    try {
      const account = await Account.create(accountBody);
      return res.json(account);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const accounts = await Account.findAll();

      return res.json(accounts);
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
      const accounts = await Account.findAll({ where: { user_id: user.dataValues.id } });

      return res.json(accounts);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(400).json({
          errors: ['Conta não encontrada'],
        });
      }

      const token = getToken(req);
      const user = await getUserByToken(token);

      if (account.user_id.toString() !== user.id.toString()) {
        res.status(422).json({ message: 'Você não pode editar a conta de outro usuário!' });
        return;
      }

      const attAccount = await account.update(req.body);
      const { type, description, value } = attAccount;

      return res.json({ type, description, value });
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
      const accounts = await Account.findAll({ where: { user_id: user.dataValues.id } });

      return res.json(accounts);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async getAccountsByPeriod(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { startDate } = req.params;
    const { endDate } = req.params;

    const start = new Date(startDate);
    const end = new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1));

    try {
      const accounts = await Account.findAll({
        where: {
          user_id: user.dataValues.id,
          transaction_date: {
            [Op.between]: [start, end],
          },
        },
      });

      res.json(accounts);
    } catch (e) {
      return res.status(400).json('Data inválida');
    }
  }

  async getAccountsByType(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { type } = req.params;

    try {
      const accounts = await Account.findAll({
        where: {
          user_id: user.dataValues.id,
          type: type,
        },
      });

      res.json(accounts);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AccountController();
