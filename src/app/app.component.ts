import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { SwitchComponent } from "./switch/switch.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        CommonModule,
        MenuComponent,
        SwitchComponent
    ]
})
export class AppComponent {
  @HostBinding('class.outlineTL') sketch: boolean = true;

  toggle($event: boolean) {
    this.sketch = $event;
  }
}
