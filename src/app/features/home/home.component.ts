import { Component, OnInit, OnDestroy, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Course } from '../../core/models/course.model';
import { Testimonial } from '../../core/models/testimonial.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);

  courses: Course[] = [];
  testimonials: Testimonial[] = [];
  stats = this.dataService.getStats();
  processSteps = this.dataService.getProcessSteps();
  whyJoinReasons = this.dataService.getWhyJoinReasons();
  whyIcons = ['sparkle', 'compass', 'mic', 'rocket', 'shield', 'users'];

  currentTestimonialPage = signal(0);
  testimonialsPerPage = 3;

  private carouselInterval: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.courses = this.dataService.getCourses();
    this.testimonials = this.dataService.getTestimonials();
    if (isPlatformBrowser(this.platformId) && this.totalPages > 1) {
      this.startCarousel();
    }
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
  }

  get visibleTestimonials(): Testimonial[] {
    const start = this.currentTestimonialPage() * this.testimonialsPerPage;
    return this.testimonials.slice(start, start + this.testimonialsPerPage);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.testimonials.length / this.testimonialsPerPage));
  }

  get pageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  setPage(index: number): void {
    this.currentTestimonialPage.set(index);
    this.resetCarousel();
  }

  nextPage(): void {
    this.currentTestimonialPage.update(p => (p + 1) % this.totalPages);
    this.resetCarousel();
  }

  prevPage(): void {
    this.currentTestimonialPage.update(p => (p - 1 + this.totalPages) % this.totalPages);
    this.resetCarousel();
  }

  iconFor(index: number): string {
    return this.whyIcons[index % this.whyIcons.length];
  }

  private startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.currentTestimonialPage.update(p => (p + 1) % this.totalPages);
    }, 6000);
  }

  private resetCarousel(): void {
    if (this.carouselInterval && isPlatformBrowser(this.platformId)) {
      clearInterval(this.carouselInterval);
      this.startCarousel();
    }
  }

  scrollToSection(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
