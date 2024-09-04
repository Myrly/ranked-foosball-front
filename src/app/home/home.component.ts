import { Component } from '@angular/core';
import {MultipleOptionsMenuComponent} from "../multiple-options-menu/multiple-options-menu.component";
import {MultipleOptionsMenuItem} from "../models/multiple-options-menu-item.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MultipleOptionsMenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  menuItems: MultipleOptionsMenuItem[] = [
    { title: 'Leaderboards', icon: 'trophy', route: '/leaderboard', key: 'L' },
    { title: 'Solo Match', icon: 'single-person', route: '/matchmaking/solo', key: 'S' },
    { title: 'Team Match', icon: 'multiple-persons', route: '/matchmaking/doubles', key: 'T' },
  ];

}
