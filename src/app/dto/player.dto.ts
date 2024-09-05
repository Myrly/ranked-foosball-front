export class PlayerDto {
  constructor(
    public id: string,
    public name: string,
    public elo: number,
    public wins: number,
    public games: number,
    public wlr: number,
    public _id: string,
  ) {
  }
}
