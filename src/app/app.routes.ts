import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK | Spoken English Classes'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About ELPN | 17+ Years of English Training | Tamil Nadu & Kerala'
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/courses.component').then(m => m.CoursesComponent),
    title: 'Courses | Spoken English, Public Speaking, Interview Prep | ELPN'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact ELPN | Enroll in Spoken English Classes | +91 8778656159'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
