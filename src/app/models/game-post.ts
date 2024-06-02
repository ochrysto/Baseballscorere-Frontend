export interface GamePost {
  // @NotNull(message = "Number for game name is mandatory")
  gameNr: number;

  date: number;

  // @NotEmpty
  location: string;

  // @NotNull(message = "Number of innings is mandatory")
  // @Min(value = 5)
  // @Max(value = 35)
  innings: number;

  // @NotNull(message = "Association id is mandatory")
  associationId: number;

  // @NotNull(message = "League id is mandatory")
  leagueId: number;

  // @NotNull(message = "Host team id is mandatory")
  hostTeamId: number;

  // @NotNull(message = "Guest team id is mandatory")
  guestTeamId: number;

  umpireIdsList: number[];

  // @NotNull(message = "Scorer id is mandatory")
  scorerId: number;
}
