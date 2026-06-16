import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: any;
  let metaService: any;

  beforeEach(() => {
    // Create mock objects with call tracking for Title and Meta
    const titleCallLog: string[] = [];
    const metaCallLog: { method: string; args: any[] }[] = [];
    const updateMetaTagsCallLog: { args: any[] }[] = [];
    const addJsonLdScriptCallLog: { args: string[] }[] = [];

    const titleSpy = {
      setTitle: (title: string) => {
        titleCallLog.push(title);
      }
    };

    const metaSpy = {
      addTag: (tag: any) => {
        metaCallLog.push({ method: 'addTag', args: [tag] });
      },
      removeTag: (selector: string) => {
        metaCallLog.push({ method: 'removeTag', args: [selector] });
      }
    };

    // Create a spy on the SeoService instance that we'll create later
    let seoServiceInstance: SeoService;

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy }
      ]
    });

    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);

    // Replace the service instance with one we can spy on
    seoServiceInstance = service as any;
    seoServiceInstance.updateMetaTags = (...args: any[]) => {
      updateMetaTagsCallLog.push({ args });
      // Call the original method
      return (service as any).originalUpdateMetaTags?.apply(service, args) || undefined;
    };
    seoServiceInstance.addJsonLdScript = (...args: string[]) => {
      addJsonLdScriptCallLog.push({ args });
      // Call the original method
      return (service as any).originalAddJsonLdScript?.apply(service, args) || undefined;
    };

    // Keep references to original methods
    (service as any).originalUpdateMetaTags = seoServiceInstance.updateMetaTags;
    (service as any).originalAddJsonLdScript = seoServiceInstance.addJsonLdScript;

    // Attach call logs for verification
    (titleService as any).callLog = titleCallLog;
    (metaService as any).callLog = metaCallLog;
    (service as any).updateMetaTagsCalls = updateMetaTagsCallLog;
    (service as any).addJsonLdScriptCalls = addJsonLdScriptCallLog;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setTitle', () => {
    it('should call titleService.setTitle with the provided title', () => {
      const testTitle = 'Test Page Title';
      service.setTitle(testTitle);
      expect((titleService as any).callLog).toContain(testTitle);
    });
  });

  describe('updateMetaTags', () => {
    it('should remove and add meta tag when tag has name property', () => {
      const testTag = { name: 'description', content: 'Test description' };
      service.updateMetaTags([testTag]);

      const log = (metaService as any).callLog;
      expect(log.length).toBe(2);
      expect(log[0]).toEqual({ method: 'removeTag', args: [`name='${testTag.name}'`] });
      expect(log[1]).toEqual({ method: 'addTag', args: [{ name: testTag.name, content: testTag.content }] });
    });

    it('should remove and add meta tag when tag has property property', () => {
      const testTag = { property: 'og:title', content: 'Test OG Title' };
      service.updateMetaTags([testTag]);

      const log = (metaService as any).callLog;
      expect(log.length).toBe(2);
      expect(log[0]).toEqual({ method: 'removeTag', args: [`property='${testTag.property}'`] });
      expect(log[1]).toEqual({ method: 'addTag', args: [{ property: testTag.property, content: testTag.content }] });
    });

    it('should handle multiple tags', () => {
      const tags = [
        { name: 'description', content: 'Test description' },
        { property: 'og:title', content: 'Test OG Title' }
      ];
      service.updateMetaTags(tags);

      const log = (metaService as any).callLog;
      expect(log.length).toBe(4);
      // First tag
      expect(log[0]).toEqual({ method: 'removeTag', args: [`name='${tags[0].name}'`] });
      expect(log[1]).toEqual({ method: 'addTag', args: [{ name: tags[0].name, content: tags[0].content }] });
      // Second tag
      expect(log[2]).toEqual({ method: 'removeTag', args: [`property='${tags[1].property}'`] });
      expect(log[3]).toEqual({ method: 'addTag', args: [{ property: tags[1].property, content: tags[1].content }] });
    });
  });

  describe('setCanonicalURL', () => {
    it('should remove and add canonical tag when URL is provided', () => {
      const testUrl = 'https://example.com/test';
      service.setCanonicalURL(testUrl);

      const log = (metaService as any).callLog;
      expect(log.length).toBe(2);
      expect(log[0]).toEqual({ method: 'removeTag', args: ['rel=canonical'] });
      expect(log[1]).toEqual({ method: 'addTag', args: [{ rel: 'canonical', href: testUrl }] });
    });

    it('should remove canonical tag but not add when URL is empty', () => {
      service.setCanonicalURL('');

      const log = (metaService as any).callLog;
      expect(log.length).toBe(1);
      expect(log[0]).toEqual({ method: 'removeTag', args: ['rel=canonical'] });
      // Should not have called addTag
    });
  });

  describe('setOpenGraph', () => {
    it('should create and update Open Graph tags', () => {
      const options = {
        title: 'Test OG Title',
        description: 'Test OG Description',
        image: 'https://example.com/image.jpg',
        type: 'article',
        url: 'https://example.com/test',
        siteName: 'Test Site'
      };

      service.setOpenGraph(options);

      // Should have called updateMetaTags
      expect((service as any).updateMetaTagsCalls.length).toBeGreaterThan(0);
      const callArgs = (service as any).updateMetaTagsCalls[(service as any).updateMetaTagsCalls.length - 1].args[0];
      expect(callArgs).toContainEqual({ property: 'og:title', content: 'Test OG Title' });
      expect(callArgs).toContainEqual({ property: 'og:description', content: 'Test OG Description' });
      expect(callArgs).toContainEqual({ property: 'og:image', content: 'https://example.com/image.jpg' });
      expect(callArgs).toContainEqual({ property: 'og:type', content: 'article' });
      expect(callArgs).toContainEqual({ property: 'og:url', content: 'https://example.com/test' });
      expect(callArgs).toContainEqual({ property: 'og:site_name', content: 'Test Site' });
    });

    it('should filter out tags with empty content', () => {
      const options = {
        title: 'Test OG Title',
        description: '', // Empty description should be filtered out
        image: 'https://example.com/image.jpg'
      };

      service.setOpenGraph(options);

      // Should have called updateMetaTags
      expect((service as any).updateMetaTagsCalls.length).toBeGreaterThan(0);
      const callArgs = (service as any).updateMetaTagsCalls[(service as any).updateMetaTagsCalls.length - 1].args[0];
      expect(callArgs).toContainEqual({ property: 'og:title', content: 'Test OG Title' });
      expect(callArgs).toContainEqual({ property: 'og:image', content: 'https://example.com/image.jpg' });
      // Description should be filtered out
      expect(callArgs.length).toBe(2);
    });
  });

  describe('setTwitterCard', () => {
    it('should create and update Twitter Card tags', () => {
      const options = {
        card: 'summary_large_image',
        title: 'Test Twitter Title',
        description: 'Test Twitter Description',
        image: 'https://example.com/image.jpg',
        site: '@testsite',
        creator: '@testcreator'
      };

      service.setTwitterCard(options);

      // Should have called updateMetaTags
      expect((service as any).updateMetaTagsCalls.length).toBeGreaterThan(0);
      const callArgs = (service as any).updateMetaTagsCalls[(service as any).updateMetaTagsCalls.length - 1].args[0];
      expect(callArgs).toEqual({ name: 'twitter:card', content: 'summary_large_image' });
      expect(callArgs).toContainEqual({ name: 'twitter:title', content: 'Test Twitter Title' });
      expect(callArgs).toContainEqual({ name: 'twitter:description', content: 'Test Twitter Description' });
      expect(callArgs).toContainEqual({ name: 'twitter:image', content: 'https://example.com/image.jpg' });
      expect(callArgs).toContainEqual({ name: 'twitter:site', content: '@testsite' });
      expect(callArgs).toContainEqual({ name: 'twitter:creator', content: '@testcreator' });
    });

    it('should filter out tags with empty content', () => {
      const options = {
        card: 'summary_large_image',
        title: 'Test Twitter Title',
        description: '' // Empty description should be filtered out
      };

      service.setTwitterCard(options);

      // Should have called updateMetaTags
      expect((service as any).updateMetaTagsCalls.length).toBeGreaterThan(0);
      const callArgs = (service as any).updateMetaTagsCalls[(service as any).updateMetaTagsCalls.length - 1].args[0];
      expect(callArgs).toEqual({ name: 'twitter:card', content: 'summary_large_image' });
      expect(callArgs).toContainEqual({ name: 'twitter:title', content: 'Test Twitter Title' });
      // Description should be filtered out
      expect(callArgs.length).toBe(2);
    });
  });

  describe('setStructuredData', () => {
    it('should remove existing JSON-LD tag and add new one', () => {
      const testData = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Test Page' };
      service.setStructuredData(testData);

      // Should have called addJsonLdScript
      expect((service as any).addJsonLdScriptCalls.length).toBeGreaterThan(0);
      const callArgs = (service as any).addJsonLdScriptCalls[(service as any).addJsonLdScriptCalls.length - 1].args[0];
      expect(callArgs).toContain('"@context":"https://schema.org"');
      expect(callArgs).toContain('"@type":"WebPage"');
      expect(callArgs).toContain('"name":"Test Page"');
    });
  });
});