import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const inProgress = req.query.inProgress as undefined | string;
    if (inProgress === 'true') {
      const allMatches = await this.matchesService.getMatchesInProgress();
      return res.status(200).json(allMatches.data);
    }

    if (inProgress === 'false') {
      const allMatches = await this.matchesService.getMatchesNotInProgress();
      return res.status(200).json(allMatches.data);
    }
    const allMatches = await this.matchesService.getAllMatches();
    return res.status(200).json(allMatches.data);
  }

  public async finishMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const match = await this.matchesService.finishMatchById(id);
    return res.status(200).json(match.data);
  }
}
