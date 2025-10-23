import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  unapprovedSongs: any[] = [];
  unapprovedEvents: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUnapprovedSongs();
    this.loadUnapprovedEvents();
  }

  loadUnapprovedSongs() {
    this.apiService.getUnapprovedSongs().subscribe((songs) => {
      this.unapprovedSongs = songs;
    });
  }

  approve(songId: number) {
    this.apiService.approveSong(songId).subscribe(() => {
      console.log(`approval sent for songId ${songId}`);
      this.loadUnapprovedSongs();
    });
  }

  loadUnapprovedEvents() {
    this.apiService.getUnapprovedEvents().subscribe((events) => {
      this.unapprovedEvents = events;
    });
  }

  approveEvent(EventId: number) {
    this.apiService.approveEvent(EventId).subscribe(() => {
      console.log(`approval sent for EventId ${EventId}`);
      this.loadUnapprovedEvents();
    });
  }
}
