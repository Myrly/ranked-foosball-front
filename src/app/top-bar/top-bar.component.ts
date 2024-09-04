import {Component, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  @Input() content: 'center-content' | 'avoid-top-bar' = 'center-content';

  constructor(private router: Router) {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.navigate();
        event.preventDefault();
        break;
    }
  }

  navigate() {
    this.router.navigate(['']).then();
  }

}
