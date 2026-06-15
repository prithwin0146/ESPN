import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'ESPN — English Speaking Presentation Network | Spoken English Classes'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About ESPN | 17+ Years of English Training | Tamil Nadu & Kerala'
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/courses.component').then(m => m.CoursesComponent),
    title: 'Courses | Spoken English, Public Speaking, Interview Prep | ESPN'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact ESPN | Enroll in Spoken English Classes | +91 8778656159'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
