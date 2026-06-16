import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Set the page title
   */
  setTitle(title: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.titleService.setTitle(title);
    }
  }

  /**
   * Update meta tags
   * @param tags Array of meta tag objects with name/property and content
   */
  updateMetaTags(tags: Array<{ name?: string; property?: string; content: string }>): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    tags.forEach(tag => {
      // Remove existing meta tags with the same name or property
      if (tag.name) {
        this.metaService.removeTag(`name='${tag.name}'`);
        this.metaService.addTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.metaService.removeTag(`property='${tag.property}'`);
        this.metaService.addTag({ property: tag.property, content: tag.content });
      }
    });
  }

  /**
   * Set canonical URL
   */
  setCanonicalURL(url: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Remove existing canonical tag
    this.metaService.removeTag('rel=canonical');

    // Add canonical tag
    if (url) {
      this.metaService.addTag({ rel: 'canonical', href: url });
    }
  }

  /**
   * Set Open Graph tags
   */
  setOpenGraph(options: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    url?: string;
    siteName?: string;
  }): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const ogTags = [
      { property: 'og:title', content: options.title ?? '' },
      { property: 'og:description', content: options.description ?? '' },
      { property: 'og:image', content: options.image ?? '' },
      { property: 'og:type', content: options.type ?? 'website' },
      { property: 'og:url', content: options.url ?? '' },
      { property: 'og:site_name', content: options.siteName ?? '' }
    ].filter(tag => tag.content);

    this.updateMetaTags(ogTags.map(({ property, content }) => ({ property, content })));
  }

  /**
   * Set Twitter Card tags
   */
  setTwitterCard(options: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
  }): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const twitterTags = [
      { name: 'twitter:card', content: options.card ?? 'summary_large_image' },
      { name: 'twitter:title', content: options.title ?? '' },
      { name: 'twitter:description', content: options.description ?? '' },
      { name: 'twitter:image', content: options.image ?? '' },
      { name: 'twitter:site', content: options.site ?? '' },
      { name: 'twitter:creator', content: options.creator ?? '' }
    ].filter(tag => tag.content);

    this.updateMetaTags(twitterTags);
  }

  /**
   * Set structured data (JSON-LD)
   * @param data Structured data object to be converted to JSON-LD
   */
  setStructuredData(data: object): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Add JSON-LD script using helper method
    const jsonLd = JSON.stringify(data);
    this.addJsonLdScript(jsonLd);
  }

  /**
   * Helper method to add a script tag for JSON-LD (since Meta service doesn't support innerHTML directly)
   */
  addJsonLdScript(jsonLd: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = jsonLd;

    // Remove any existing JSON-LD scripts we added (by looking for our specific marker)
    const existingScripts = document.querySelectorAll('script[data-seo-json-ld]');
    existingScripts.forEach(el => el.remove());

    script.setAttribute('data-seo-json-ld', 'true');
    document.head.appendChild(script);
  }
}