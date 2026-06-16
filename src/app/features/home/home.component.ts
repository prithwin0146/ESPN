import { Component, OnInit, OnDestroy, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Course } from '../../core/models/course.model';
import { Testimonial } from '../../core/models/testimonial.model';
import { SeoService } from '../../core/services/seo.service';

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
private seoService = inject(SeoService);

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

    // Set SEO tags for home page
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setTitle('ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK | Spoken English Classes');
      this.seoService.updateMetaTags([
        { name: 'description', content: 'ELPN (ENGLISH LANGUAGE PRESENTAION NETWORK) offers the best spoken English online classes. Founded in 2009 by Rajendiran Prakas. Serving Tamil Nadu & Kerala for 17+ years. Call: +91 8778656159' },
        { name: 'keywords', content: 'spoken english classes, spoken english online, english speaking classes, ELPN english, Rajendiran Prakas, Tamil Nadu english classes, Kerala english classes, interview preparation, public speaking' }
      ]);
      this.seoService.setCanonicalURL('https://www.elpn.example.com/');
      this.seoService.setOpenGraph({
        title: 'ELPN — Spoken English Online Classes | Tamil Nadu & Kerala',
        description: 'Transform your English with 17+ years of proven coaching. 10,000+ students trained. Enroll today!',
        image: 'https://www.elpn.example.com/assets/og-image-home.jpg',
        type: 'website',
        url: 'https://www.elpn.example.com/',
        siteName: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'
      });
      this.seoService.setTwitterCard({
        card: 'summary_large_image',
        title: 'ELPN — Spoken English Online Classes',
        description: 'Transform your English with 17+ years of proven coaching.',
        image: 'https://www.elpn.example.com/assets/twitter-image-home.jpg',
        site: '@ELPN_Official',
        creator: '@RajendiranPrakas'
      });

      // Structured data for LocalBusiness
      this.seoService.setStructuredData({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK",
        "image": "https://www.elpn.example.com/assets/logo.jpg",
        "@id": "https://www.elpn.example.com/",
        "url": "https://www.elpn.example.com/",
        "telephone": "+91-8778656159",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Education Street",
          "addressLocality": "Tamil Nadu",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.9716",
          "longitude": "77.5946"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8778656159",
          "contactType": "Customer Service"
        }
      });
    }

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
