import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCheckerComponent } from './camera-checker.component';

describe('CameraCheckerComponent', () => {
  let component: CameraCheckerComponent;
  let fixture: ComponentFixture<CameraCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
