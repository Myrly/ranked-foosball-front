export class CreateGameDto {
  constructor(
    public id: string,
    public firstTeam: string[],
    public secondTeam: string[],
  ) {
  }
}
