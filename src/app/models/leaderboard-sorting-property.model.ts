import {PlayerDto} from "../dto/player.dto";

export interface LeaderboardSortingPropertyModel {
  name: string;
  key: string;
  sorting: string;
  propertyName: keyof PlayerDto;
}
