// side-nav.ts (StandAlone Component)
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Roteamento
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; // Para os links de navegação

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {}
