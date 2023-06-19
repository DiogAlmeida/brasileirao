import { Request, Response, Router } from 'express';
import tokenValidate from '../middlewares/TokenValidate';
import UsersController from '../controllers/UsersController';
import loginValidate from '../middlewares/loginValidate';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  loginValidate.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);
router.get(
  '/role',
  tokenValidate.validateToken,
  (req: Request, res: Response) => usersController.getUserRole(req, res),
);

export default router;
