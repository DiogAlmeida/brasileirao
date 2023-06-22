import { ID } from '.';

export interface ICRUDModelTeam <T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUsers <T> {
  findByEmail(email: string): Promise<T | null>,
}

export interface ICRUDModelMatches <T> {
  findAllMatches(): Promise<T[]>
  findMatchesInProgress(): Promise<T[]>
  findMatchesNotInProgress(): Promise<T[]>
  findMatchById(matchId: string): Promise<T | null>
  finishMatchById(matchId: string): Promise<{ message: string; }>
  updateMatchById(matchId: string, homeTeamGoals: number, awayTeamGoals: number): void
  createMatchInProgress(
    homeTeamId: number, awayTeamId: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<T>
}
