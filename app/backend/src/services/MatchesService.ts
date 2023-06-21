import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches():
  Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesInProgress():
  Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findMatchesInProgress();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesNotInProgress():
  Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findMatchesNotInProgress();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatchById(matchId: string):Promise<ServiceResponse<{ message: string; }>> {
    const response = await this.matchesModel.finishMatchById(matchId);
    return { status: 'SUCCESSFUL', data: response };
  }
}
