import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FunctionDetailComponent } from './components/function-detail/function-detail.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'functions', component: FunctionsComponent },
    { path: 'functions/:category', component: FunctionsComponent },
    { path: 'function/:name', component: FunctionDetailComponent },
    { path: 'tables', loadComponent: () => import('./components/tables/tables.component').then(m => m.TablesComponent) },
    { path: 'quiz', component: QuizComponent },
    { path: '**', redirectTo: 'login' }
];

