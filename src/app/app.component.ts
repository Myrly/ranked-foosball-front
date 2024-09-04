import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MultipleOptionsMenuComponent} from "./multiple-options-menu/multiple-options-menu.component";
import {MultipleOptionsMenuItem} from "./models/multiple-options-menu-item.model";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {DisableRightClickService} from "./services/disable-right-click.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultipleOptionsMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  svgIcons: string[] = [
    'multiple-persons', 'random', 'setting', 'single-person', 'trophy'
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private rightClickDisable: DisableRightClickService
  ) {
    this.rightClickDisable.disableRightClick();
    this.svgIcons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/" + icon + ".svg")
      );
    });
  }

}
