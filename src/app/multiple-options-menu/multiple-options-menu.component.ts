import {Component, AfterViewInit, ElementRef, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
import {Router} from "@angular/router";
import {MultipleOptionsMenuItemComponent} from "../multiple-options-menu-item/multiple-options-menu-item.component";
import {NgForOf} from "@angular/common";
import {MultipleOptionsMenuItem} from "../models/multiple-options-menu-item.model";

@Component({
  selector: 'app-multiple-options-menu',
  standalone: true,
  imports: [
    MultipleOptionsMenuItemComponent,
    NgForOf
  ],
  templateUrl: './multiple-options-menu.component.html',
  styleUrl: './multiple-options-menu.component.scss'
})
export class MultipleOptionsMenuComponent implements AfterViewInit {
  @ViewChildren(MultipleOptionsMenuItemComponent, { read: ElementRef }) menuItemsRefs: QueryList<ElementRef> = null!;
  @Input() menuItems: MultipleOptionsMenuItem[] = [];
  selectedIndex = 0;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Use setTimeout to wait for a tick to ensure the view is completely initialized
    setTimeout(() => this.adjustMenuItemsSize());
  }

  adjustMenuItemsSize() {
    let maxWidth = 0;
    let maxHeight = 0;

    // Calculate the maximum width and height
    this.menuItemsRefs.forEach(ref => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.width > maxWidth) {
        maxWidth = rect.width;
      }
      if (rect.height > maxHeight) {
        maxHeight = rect.height;
      }
    });

    // Set the width and height of all menu items to the maximum width and height
    this.menuItemsRefs.forEach(ref => {
      ref.nativeElement.style.width = `${maxWidth}px`;
      ref.nativeElement.style.height = `${maxHeight}px`;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
      case 'Tab':
        this.navigate(1);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.navigate(-1);
        event.preventDefault();
        break;
      case 'Enter':
      case 'Space':
        this.selectItem();
        break;
      // case any of the key in menuItems.key => selectItem()
      default:
        const key = event.key.toUpperCase();
        const index = this.menuItems.findIndex(item => item.key === key);
        if (index !== -1) {
          this.selectedIndex = index;
          this.selectItem();
        }
    }
  }

  navigate(direction: number) {
    this.selectedIndex = (this.selectedIndex + direction + this.menuItems.length) % this.menuItems.length;
  }

  selectItem() {
    const selectedItem = this.menuItems[this.selectedIndex];
    this.router.navigate([selectedItem.route]).then(r => console.log(r));
  }
}
