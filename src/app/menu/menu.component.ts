import { Component } from '@angular/core';
import { MenuItem } from '../menu-item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      id: 0,
      text: 'Inicio',
      url: ''
    },
    {
      id: 1,
      text: 'Estudios',
      url: '/estudios',
    },
    {
      id: 2,
      text: 'Experiencia',
      url: '/experiencia',
    },
  ];
}
