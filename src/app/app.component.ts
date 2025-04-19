import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCameraPage = false;

  togglePage(): void {
    this.isCameraPage = !this.isCameraPage;
  }
}
