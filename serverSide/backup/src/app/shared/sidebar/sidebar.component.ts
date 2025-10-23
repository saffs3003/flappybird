import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

export interface Routes {
  route: string;
  icon: string;
  linkText: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent {
  @Input() routes: Routes[] = [];

  // sidenavLinks = [
  //   { route: 'dashboard', icon: 'home', linkText: 'Home' },
  //   { route: 'songs', icon: 'music_note', linkText: 'Songs' },
  //   { route: 'profile', icon: 'person', linkText: 'Artists' },
  //   { route: 'mybookings', icon: 'calendar_today', linkText: 'Events' },
  // ];

  constructor() {}
}
