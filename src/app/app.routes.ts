import { Routes } from '@angular/router';
import {ServerOverviewComponent} from './pages/server-overview/server-overview.component';

export const routes: Routes = [
  { path: '', component: ServerOverviewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
