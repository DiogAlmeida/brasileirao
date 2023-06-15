import { Router } from 'express';
import teamsRouter from './teamsRouter';
import usersRouter from './usersRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
