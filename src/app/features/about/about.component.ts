import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SeoService } from '../../core/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  milestones = [
    { year: '2009', title: 'ELPN Founded', desc: 'Mr. Rajendiran Prakas established ELPN in Tamil Nadu with a mission to empower communicators.' },
    { year: '2012', title: 'First 1000 Students', desc: 'Reached the milestone of training 1000+ students across schools and colleges.' },
    { year: '2015', title: 'Kerala Expansion', desc: 'ELPN expanded its presence to Kerala, serving students across two South Indian states.' },
    { year: '2018', title: '5000+ Students Trained', desc: 'Celebrated training 5000+ students with a consistent 98% success rate.' },
    { year: '2021', title: 'Online Classes Launched', desc: 'Launched interactive online live classes to reach learners from anywhere.' },
    { year: '2026', title: '10,000+ Students', desc: '17 years strong — serving 10,000+ students across 50+ partner institutions.' }
  ];

  values = [
    { icon: '💡', title: 'Innovation', desc: 'We continuously evolve our teaching methods to stay ahead in language education.' },
    { icon: '❤️', title: 'Empathy', desc: 'We understand every learner\'s journey is unique and teach with patience and care.' },
    { icon: '🏆', title: 'Excellence', desc: 'We set and maintain the highest standards in English language training.' },
    { icon: '🤝', title: 'Integrity', desc: 'We build trust with honest, transparent, and commitment-driven training programs.' }
  ];

  private seoService = inject(SeoService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.seoService.setTitle('About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK');
      this.seoService.updateMetaTags([
        { name: 'description', content: 'Learn about ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK. Founded in 2009 by Rajendiran Prakas, we have been providing quality spoken English classes for 17+ years.' },
        { name: 'keywords', content: 'about ESPN, ESPN history, spoken English institute, Rajendiran Prakas, English speaking classes Tamil Nadu, English speaking classes Kerala' }
      ]);
      this.seoService.setCanonicalURL('https://www.elpn.example.com/about');
      this.seoService.setOpenGraph({
        title: 'About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Learn about ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK. Founded in 2009 by Rajendiran Prakas, we have been providing quality spoken English classes for 17+ years.',
        image: 'https://www.elpn.example.com/assets/og-image-about.jpg',
        type: 'website',
        url: 'https://www.elpn.example.com/about',
        siteName: 'ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'
      });
      this.seoService.setTwitterCard({
        card: 'summary_large_image',
        title: 'About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Learn about our history, mission, and values.',
        image: 'https://www.elpn.example.com/assets/twitter-image-about.jpg',
        site: '@ELPN_Official',
        creator: '@RajendiranPrakas'
      });

      // Structured data for EducationalOrganization
      this.seoService.setStructuredData({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK",
        "url": "https://www.elpn.example.com/about",
        "logo": "https://www.elpn.example.com/assets/logo.jpg",
        "foundingDate": "2009",
        "founder": {
          "@type": "Person",
          "name": "Rajendiran Prakas"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Education Street",
          "addressLocality": "Tamil Nadu",
          "postalCode": "600001",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8778656159",
          "contactType": "Customer Service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Tamil"]
        },
        "alumni": [
          {
            "@type": "Person",
            "name": "Success Story 1",
            "alumniOf": "ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK"
          },
          {
            "@type": "Person",
            "name": "Success Story 2",
            "alumniOf": "ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK"
          }
        ]
      });
    }
  }
}
