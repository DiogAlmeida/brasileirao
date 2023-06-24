import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';
import { calculateEfficiency,
  calculateTotalPoint, historic,
  resultsMatch, createTable, calculateStatsGoals,
  sortedteamsStats, calculateTotalGames } from '../utils/teamStats';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class Leaderboards {
  constructor(
    private matchModel = new MatchesModel(),
  ) {}

  public async getHomeTeamPerformance(): Promise<ServiceResponse<ILeaderboards[]>> {
    const closedMatches = await this.matchModel.findMatchesNotInProgress();
    const teamsStats: ILeaderboards[] = Object
      .values(closedMatches.reduce((stats: any, match: any) => {
        const newStats = { ...stats };

        const { homeTeamGoals, homeTeam, awayTeamGoals } = match;
        const { teamName } = homeTeam;

        if (!(stats as any)[teamName]) { (newStats)[teamName] = createTable(teamName); }
        const matchResult = historic(homeTeamGoals, awayTeamGoals);
        calculateTotalGames(newStats, teamName);
        resultsMatch(newStats, teamName, matchResult);
        calculateTotalPoint(newStats, teamName, matchResult);
        calculateStatsGoals(newStats, teamName, homeTeamGoals, awayTeamGoals);
        calculateEfficiency(newStats, teamName);
        return newStats;
      }, {}));

    const teamsStatsSorted = sortedteamsStats(teamsStats);

    return { status: 'SUCCESSFUL', data: teamsStatsSorted };
  }
}
