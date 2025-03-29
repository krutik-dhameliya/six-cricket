import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { CountDownService } from './count-down.service';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {
  secondsLeft: number = 0;

  totalSeconds: number = 0;
  progress: number = 100;
  color: string = 'primary';

  private destroy$ = new Subject<void>();

  constructor(private countDownService: CountDownService) { }

  ngOnInit() {
    this.countDownService.getSecondsLeft().pipe(
      switchMap(seconds => {
        this.secondsLeft = seconds;
        this.totalSeconds = seconds;
        return interval(1000);
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        this.updateProgress();
      }
    });
  }

  updateProgress() {
    this.progress = (this.secondsLeft / this.totalSeconds) * 100;
    this.color = this.secondsLeft < 10 ? 'warn' : this.secondsLeft < 30 ? 'accent' : 'primary';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
