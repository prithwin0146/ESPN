import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SeoService } from '../../core/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ScrollRevealDirective],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  private dataService = inject(DataService);
  private seoService = inject(SeoService);
  courses = this.dataService.getCourses();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setTitle('Our Courses — ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK');
      this.seoService.updateMetaTags([
        { name: 'description', content: 'Explore our comprehensive spoken English courses at ELPN. From beginner to advanced levels, we offer customized training programs for students, professionals, and anyone looking to improve their English communication skills.' },
        { name: 'keywords', content: 'spoken English courses, English speaking classes, beginner English course, advanced English course, business English, interview preparation, public speaking training' }
      ]);
      this.seoService.setCanonicalURL('https://www.elpn.example.com/courses');
      this.seoService.setOpenGraph({
        title: 'Our Courses — ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Explore our comprehensive spoken English courses at ELPN. From beginner to advanced levels, we offer customized training programs.',
        image: 'https://www.elpn.example.com/assets/og-image-courses.jpg',
        type: 'website',
        url: 'https://www.elpn.example.com/courses',
        siteName: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'
      });
      this.seoService.setTwitterCard({
        card: 'summary_large_image',
        title: 'Our Courses — ELPN',
        description: 'Explore our comprehensive spoken English courses from beginner to advanced levels.',
        image: 'https://www.elpn.example.com/assets/twitter-image-courses.jpg',
        site: '@ELPN_Official',
        creator: '@RajendiranPrakas'
      });

      // Structured data for Course
      this.seoService.setStructuredData({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Spoken English Course",
        "description": "Comprehensive spoken English training program",
        "provider": {
          "@type": "Organization",
          "name": "ESPN — English Speaking Presentation Network",
          "url": "https://www.espn.example.com"
        },
        "instructor": {
          "@type": "Person",
          "name": "Rajendiran Prakas"
        },
        "duration": "P3M", // 3 months
        "courseMode": "Part-time",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "5000",
          "availability": "https://schema.org/InStock"
        }
      });
    }
  }
}
