export interface GameScore {

  guestTeamRuns: number,
  homeTeamRuns: number,
  guestTeamHits: number,
  homeTeamHits: number,
  guestTeamErrors: number,
  homeTeamErrors: number,
  guestTeamLobs: number,
  homeTeamLobs: number,
  currentInning: number;
  topOrBottom: string;
  outs: number;
}
