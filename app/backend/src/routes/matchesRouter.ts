import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import tokenValidate from '../middlewares/TokenValidate';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.get('/:id', (req: Request, res: Response) => matchesController.getMatchById(req, res));
router.patch(
  '/:id/finish',
  tokenValidate.validateToken,
  (req: Request, res: Response) => matchesController.finishMatchById(req, res),
);
router.patch(
  '/:id',
  tokenValidate.validateToken,
  (req: Request, res: Response) => matchesController.updateMatchById(req, res),
);
router.post(
  '/',
  tokenValidate.validateToken,
  (req: Request, res: Response) => matchesController.createMatchInProgress(req, res),
);

export default router;
