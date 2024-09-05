import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {

  @Input() possibleScoresKeys: string[] = [];
  @Input() selectedKey: string = '';

  constructor() {
  }

}
