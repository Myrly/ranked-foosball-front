export class AddPlayerGameDto {

  constructor(
    public gameId: string,
    public isFirstTeam: boolean,
    public playerId: string,
  ) {
  }

}
