import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';

export type dataType = {
  id:number,
  homeTeamId:number,
  homeTeamGoals:number,
  awayTeamId:number,
  awayTeamGoals:number,
  inProgress: boolean,
  homeTeam: {
    id: number,
    'teamName': string,
  },
  awayTeam: {
    id: number,
    'teamName': string,
  },

};

export type historicType = {
  totalVictories:number;
  totalDraws: number;
  totalLosses: number;
};

export type staticTeamsType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsBalance: number,
  efficiency: number
};

type matchResultType = {
  totalVictories: number,
  totalDraws: number,
  totalLosses: number
};

export const historic = (homeTeamGoals: number, awayTeamGoals: number): historicType => {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  if (homeTeamGoals > awayTeamGoals) {
    totalVictories += 1;
  } else if (homeTeamGoals < awayTeamGoals) {
    totalLosses += 1;
  } else {
    totalDraws += 1;
  }
  return { totalVictories, totalDraws, totalLosses };
};

export const createTable = (teamName: string): staticTeamsType => ({
  name: teamName,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

export const calculateTotalGames = (stats: any, teamName: string) => {
  const newStats = { ...stats };
  newStats[teamName].totalGames += 1;
};

export const resultsMatch = (
  stats: any,
  teamName: string,
  matchResult: matchResultType,
) => {
  const newStats = { ...stats };
  newStats[teamName].totalVictories += matchResult.totalVictories;
  newStats[teamName].totalDraws += matchResult.totalDraws;
  newStats[teamName].totalLosses += matchResult.totalLosses;
};

export const calculateTotalPoint = (
  stats: any,
  teamName: string,
  matchResult: matchResultType,
) => {
  const newStats = { ...stats };
  const totalVictoriesPoint = matchResult.totalVictories * 3;
  newStats[teamName].totalPoints += totalVictoriesPoint + matchResult.totalDraws;
};

export const calculateEfficiency = (stats: any, teamName: string) => {
  const newStats = { ...stats };

  const multTotalGames = newStats[teamName].totalGames * 3;
  const totalPointDivMultTotalGames = (newStats[teamName].totalPoints / multTotalGames);
  const efficiency = (totalPointDivMultTotalGames * 100);
  newStats[teamName]
    .efficiency = efficiency.toFixed(2);
};

export const calculateStatsGoals = (
  stats: any,
  teamName: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const newStats = { ...stats };
  newStats[teamName].goalsFavor += homeTeamGoals;
  newStats[teamName].goalsOwn += awayTeamGoals;
  newStats[teamName]
    .goalsBalance = newStats[teamName].goalsFavor - newStats[teamName].goalsOwn;
};

export const sortedteamsStats = (teamsStats: ILeaderboards[]) => teamsStats
  .sort((teamStatsA, teamStatsB) => {
    if (teamStatsA.totalPoints !== teamStatsB.totalPoints) {
      return teamStatsB.totalPoints - teamStatsA.totalPoints;
    }
    if (teamStatsA.totalVictories !== teamStatsB.totalVictories) {
      return teamStatsB.totalVictories - teamStatsA.totalVictories;
    }
    if (teamStatsA.goalsBalance !== teamStatsB.goalsBalance) {
      return teamStatsB.goalsBalance - teamStatsA.goalsBalance;
    }
    return teamStatsB.goalsFavor - teamStatsA.goalsFavor;
  });
