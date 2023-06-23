import { Router } from 'express';
import teamsRouter from './teamsRouter';
import usersRouter from './usersRouter';
import matchesRouter from './matchesRouter';
import leadboard from './leadboardRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leadboard);

export default router;
