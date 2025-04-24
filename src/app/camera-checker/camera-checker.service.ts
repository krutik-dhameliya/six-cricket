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
  ): boolean {
    const distanceRanges = cameras.map(c => c.distanceRange);
    const lightRanges = cameras.map(c => c.lightRange);

    const isDistanceCovered = this.isRangeFullyCovered(requiredDistance, distanceRanges);
    const isLightCovered = this.isRangeFullyCovered(requiredLight, lightRanges);

    return isDistanceCovered && isLightCovered;
  }

  isRangeFullyCovered(
    required: [number, number],
    ranges: [number, number][]
  ): boolean {
    const merged = this.mergeIntervals(ranges);
    for (const [start, end] of merged) {
      if (start <= required[0] && end >= required[1]) return true;
    }
    return false;
  }

  mergeIntervals(intervals: [number, number][]): [number, number][] {
    if (intervals.length === 0) return [];

    intervals.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
      const [currStart, currEnd] = intervals[i];
      const last = merged[merged.length - 1];

      if (currStart <= last[1]) {
        last[1] = Math.max(last[1], currEnd);
      } else {
        merged.push(intervals[i]);
      }
    }

    return merged;
  }
}
