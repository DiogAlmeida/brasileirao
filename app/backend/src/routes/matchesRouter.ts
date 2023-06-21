import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import tokenValidate from '../middlewares/TokenValidate';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  tokenValidate.validateToken,
  (req: Request, res: Response) => matchesController.finishMatchById(req, res),
);

export default router;
