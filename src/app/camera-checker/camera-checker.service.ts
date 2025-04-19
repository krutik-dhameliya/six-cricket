import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraCheckerService {

  private cameraDataUrl = 'assets/cameras.json';

  constructor(private http: HttpClient) { }

  getCameras(): Observable<any[]> {
    return this.http.get<any[]>(this.cameraDataUrl);
  }

  isCoverageSufficient(
    requiredDistance: [number, number],
    requiredLight: [number, number],
    cameras: { name: string; distanceRange: [number, number]; lightRange: [number, number] }[]
  ): string[] {
    const mergedDistances = this.mergeIntervals(
      cameras.map((c) => c.distanceRange)
    );
    const mergedLightLevels = this.mergeIntervals(
      cameras.map((c) => c.lightRange)
    );

    const isDistanceCovered = this.isRangeCovered(requiredDistance, mergedDistances);
    const isLightCovered = this.isRangeCovered(requiredLight, mergedLightLevels);

    if (!isDistanceCovered || !isLightCovered) return [];

    return cameras
      .filter((c) =>
        this.isRangeCovered(requiredDistance, [c.distanceRange]) &&
        this.isRangeCovered(requiredLight, [c.lightRange])
      )
      .map((c) => c.name);
  }

  private mergeIntervals(intervals: [number, number][]): [number, number][] {
    if (!intervals.length) return [];

    intervals.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
      const last = merged[merged.length - 1];
      if (intervals[i][0] <= last[1]) {
        last[1] = Math.max(last[1], intervals[i][1]);
      } else {
        merged.push(intervals[i]);
      }
    }
    return merged;
  }

  private isRangeCovered(
    required: [number, number],
    merged: [number, number][]
  ): boolean {
    for (const [start, end] of merged) {
      if (start <= required[0] && end >= required[1]) {
        return true;
      }
    }
    return false;
  }
}
