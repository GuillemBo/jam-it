import { AfterViewInit, Component } from '@angular/core';
import { Dropdown } from 'flowbite';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements AfterViewInit {
  isCollapsed = true; // Controlador del estado del dropdown

  constructor() {}

  ngAfterViewInit(): void {
    // Inicializa el dropdown después de que Angular haya completado la inicialización del componente
    const dropdownElement = document.getElementById('user-dropdown');
    if (dropdownElement) {
      new Dropdown(dropdownElement);  // Aquí inicializas el Dropdown con Flowbite
    }
  }

  toggleCollapse(): void {
    // Alterna el estado de visibilidad del dropdown
    this.isCollapsed = !this.isCollapsed;
  }
}