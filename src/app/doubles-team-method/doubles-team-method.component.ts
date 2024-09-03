import { Component } from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";
import {MultipleOptionsMenuComponent} from "../multiple-options-menu/multiple-options-menu.component";
import {MultipleOptionsMenuItem} from "../models/multiple-options-menu-item.model";

@Component({
  selector: 'app-doubles-team-method',
  standalone: true,
  imports: [
    TopBarComponent,
    MultipleOptionsMenuComponent
  ],
  templateUrl: './doubles-team-method.component.html',
  styleUrl: './doubles-team-method.component.scss'
})
export class DoublesTeamMethodComponent {

  menuItems: MultipleOptionsMenuItem[] = [
    { title: 'Choose Teams', icon: 'setting', route: '/matchmaking/set-doubles', key: 'C' },
    { title: 'Random Teams', icon: 'random', route: '/matchmaking/random-doubles', key: 'R' },
  ];

}
