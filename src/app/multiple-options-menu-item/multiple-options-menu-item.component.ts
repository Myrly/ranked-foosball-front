import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-multiple-options-menu-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatIcon,
    NgIf
  ],
  templateUrl: './multiple-options-menu-item.component.html',
  styleUrl: './multiple-options-menu-item.component.scss'
})
export class MultipleOptionsMenuItemComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() isSelected: boolean = false;
  @Input() key: string = '';
}
