import { Component, OnInit } from '@angular/core';
import { CameraCheckerService } from './camera-checker.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-camera-checker',
  templateUrl: './camera-checker.component.html',
  styleUrls: ['./camera-checker.component.scss']
})
export class CameraCheckerComponent implements OnInit {

  showResults = false;
  viewAddCameraForm = false;
  requiredDistance: [number, number] = [1, 8];
  requiredLight: [number, number] = [200, 800];
  cameras: { name: string; distanceRange: [number, number]; lightRange: [number, number] }[] = [];
  newCamera: { name: string; distanceRange: [number, number]; lightRange: [number, number] } = { name: '', distanceRange: [0, 0], lightRange: [0, 0] };
  displayedColumns: string[] = ['name', 'distanceRange', 'lightRange', 'actions'];
  dataSource = new MatTableDataSource(this.cameras);
  sufficientCameras: boolean;

  constructor(private cameraService: CameraCheckerService) {}

  ngOnInit(): void {
    this.loadCameras();
  }

  loadCameras() {
    this.cameraService.getCameras().subscribe(data => {
      this.cameras = data;
      this.dataSource.data = [...this.cameras];
    });
  }

  toggleContent() {
    this.viewAddCameraForm = !this.viewAddCameraForm;
  }
  addCamera() {
    if (this.newCamera.name && this.newCamera.distanceRange[0] && this.newCamera.distanceRange[1] && this.newCamera.lightRange[0] && this.newCamera.lightRange[1]) {
      this.cameras.push({ ...this.newCamera });
      this.dataSource.data = [...this.cameras];
      this.newCamera = { name: '', distanceRange: [0, 0], lightRange: [0, 0] };
    } else {
      alert('Please add proper data');
    }
  }

  removeCamera(index: number) {
    this.cameras.splice(index, 1);
    this.dataSource.data = [...this.cameras];
  }

  checkCoverage() {
    this.sufficientCameras  = this.cameraService.isCoverageSufficient(
      this.requiredDistance,
      this.requiredLight,
      this.cameras
    );
    this.showResults = true;
  }
}
