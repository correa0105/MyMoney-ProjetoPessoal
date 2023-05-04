import { Router } from 'express';

import AccountController from '../controllers/AccountController';
import authRequired from '../middlewares/authRequired';

const router = new Router();

router.post('/', authRequired, AccountController.store);
router.get('/', authRequired, AccountController.index);
router.get('/myaccounts', authRequired, AccountController.show);
router.put('/myaccounts/:id', authRequired, AccountController.update);
router.delete('/:id', authRequired, AccountController.delete);

router.get('/myaccounts/:startDate/:endDate', authRequired, AccountController.getAccountsByPeriod);
router.get('/myaccounts/:type', authRequired, AccountController.getAccountsByType);

export default router;
