import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
      text: 'Facturas',
      url: '/factura',
    },
    {
      id: 2,
      text: 'Buscar',
      url: '/buscar',
    },
  ];
}
