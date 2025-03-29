import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountDownComponent } from './count-down/count-down.component';
import { CameraCheckerComponent } from './camera-checker/camera-checker.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'count-down', component: CountDownComponent },
  { path: 'camera-checker', component: CameraCheckerComponent },
  { path: '', redirectTo: 'count-down', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
