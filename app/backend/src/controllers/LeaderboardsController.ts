import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  constructor(
    private leaderboardsService = new LeaderboardsService(),
  ) {}

  public async getHomeTeamsPerformance(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardsService.getHomeTeamPerformance();
    res.status(200).json(serviceResponse.data);
  }
}
