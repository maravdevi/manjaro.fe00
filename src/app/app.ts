import { Component } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCard],
  template: '<app-profile-card></app-profile-card>',
  styleUrl: './app.scss'
})
export class App {

}
