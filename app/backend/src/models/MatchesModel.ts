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
}
