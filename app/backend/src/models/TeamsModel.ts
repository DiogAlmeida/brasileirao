import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
