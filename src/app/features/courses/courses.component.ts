import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ScrollRevealDirective],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  private dataService = inject(DataService);
  courses = this.dataService.getCourses();
}
