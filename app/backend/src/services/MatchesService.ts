import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/matches/IMatches';
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamModel: ITeamsModel = new TeamsModel(),
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

  public async getMatchById(matchId: string):
  Promise<ServiceResponse<IMatches | null>> {
    const match = await this.matchesModel.findMatchById(matchId);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async finishMatchById(matchId: string):Promise<ServiceResponse<{ message: string; }>> {
    const response = await this.matchesModel.finishMatchById(matchId);
    return { status: 'SUCCESSFUL', data: response };
  }

  public async updateMatchById(matchId: string, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<IMatches | null>> {
    if (!homeTeamGoals || !awayTeamGoals) {
      return { status: 'INVALID_DATA',
        data: { message: '"homeTeamGoals" and "awayTeamGoals" are required' } };
    }
    const match = await this.matchesModel.findMatchById(matchId);
    if (match?.inProgress !== true) {
      return { status: 'UNAUTHORIZED', data: { message: 'match not in progress' } };
    }
    this.matchesModel.updateMatchById(matchId, homeTeamGoals, awayTeamGoals);
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    return { status: 'SUCCESSFUL', data: match };
  }

  public async createMatchInProgress(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches>> {
    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const matchCreated = await this.matchesModel
      .createMatchInProgress(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: matchCreated };
  }
}
