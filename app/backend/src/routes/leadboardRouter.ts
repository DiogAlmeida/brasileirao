import { Request, Response, Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsController = new LeaderboardsController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardsController.getHomeTeamsPerformance(req, res),
);

export default router;
