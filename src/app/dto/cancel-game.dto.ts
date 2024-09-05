export class CancelGameDto {

  constructor(
    public id: string,
    public isCancelled: boolean = true,
  ) {
  }

}
