import { Component, OnInit } from '@angular/core';
import { CameraCheckerService } from './camera-checker.service';

@Component({
  selector: 'app-camera-checker',
  templateUrl: './camera-checker.component.html',
  styleUrls: ['./camera-checker.component.scss']
})
export class CameraCheckerComponent {

  requiredDistance: [number, number] = [0, 100];
  requiredLight: [number, number] = [10, 1000];
  cameras: { name: string; distanceRange: [number, number]; lightRange: [number, number] }[] = [];
  sufficientCameras: string[] = [];

  constructor(private cameraService: CameraCheckerService) {}

  addCamera() {
    this.cameras.push({ name: '', distanceRange: [0, 0], lightRange: [0, 0] });
  }

  removeCamera(index: number) {
    this.cameras.splice(index, 1);
  }

  checkCoverage() {
    this.sufficientCameras  = this.cameraService.isCoverageSufficient(
      this.requiredDistance,
      this.requiredLight,
      this.cameras
    );
  }
}
