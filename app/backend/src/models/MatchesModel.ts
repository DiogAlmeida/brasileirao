import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAllMatches(): Promise<IMatches[]> {
    const allMatches = await this.model.findAll({
      include: [{ model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' }],
    });
    return allMatches;
  }

  async findMatchesInProgress(): Promise<IMatches[]> {
    const allMatches = await this.model.findAll({
      include: [{ model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' }],
      where: { inProgress: true },
    });
    return allMatches;
  }

  async findMatchesNotInProgress(): Promise<IMatches[]> {
    const allMatches = await this.model.findAll({
      include: [{ model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' }],
      where: { inProgress: false },
    });
    return allMatches;
  }

  async findMatchById(matchId: string): Promise<IMatches | null> {
    const match = await this.model.findOne({
      include: [{ model: SequelizeTeams, as: 'homeTeam' },
        { model: SequelizeTeams, as: 'awayTeam' }],
      where: { id: matchId },
    });
    return match;
  }

  async finishMatchById(matchId: string): Promise<{ message: string; }> {
    await this.model.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    return { message: 'Finished' };
  }

  async updateMatchById(matchId: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: matchId } },
    );
  }
}
