import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let seoService: any;
  let dataService: any;

  beforeEach(() => {
    // Create mock objects with call tracking for SeoService
    const seoCallLog: { method: string; args: any[] }[] = [];

    const seoSpy = {
      setTitle: (title: string) => {
        seoCallLog.push({ method: 'setTitle', args: [title] });
      },
      updateMetaTags: (tags: any[]) => {
        seoCallLog.push({ method: 'updateMetaTags', args: [tags] });
      },
      setCanonicalURL: (url: string) => {
        seoCallLog.push({ method: 'setCanonicalURL', args: [url] });
      },
      setOpenGraph: (options: any) => {
        seoCallLog.push({ method: 'setOpenGraph', args: [options] });
      },
      setTwitterCard: (options: any) => {
        seoCallLog.push({ method: 'setTwitterCard', args: [options] });
      },
      setStructuredData: (data: any) => {
        seoCallLog.push({ method: 'setStructuredData', args: [data] });
      }
    };

    // Create mock objects with call tracking for DataService
    const dataCallLog: { method: string; args: any[] }[] = [];

    const dataSpy = {
      getMilestones: () => {
        dataCallLog.push({ method: 'getMilestones', args: [] });
        return [];
      },
      getValues: () => {
        dataCallLog.push({ method: 'getValues', args: [] });
        return [];
      }
    };

    TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(AboutComponent).componentInstance;
    seoService = TestBed.inject(SeoService);
    dataService = TestBed.inject(DataService);

    // Attach call logs for verification
    (seoService as any).callLog = seoCallLog;
    (dataService as any).callLog = dataCallLog;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SEO service methods on init', () => {
    // Call ngOnInit
    component.ngOnInit();

    // Verify SEO service methods were called
    const seoLog = (seoService as any).callLog;

    // Check setTitle
    expect(seoLog).toContainEqual({ method: 'setTitle', args: ['About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK'] });

    // Check updateMetaTags
    expect(seoLog).toContainEqual({ method: 'updateMetaTags', args: [
      [{ name: 'description', content: 'Learn about ELPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.' },
       { name: 'keywords', content: 'About ELPN, ENGLISH LANGUAGE PRESENTAION NETWORK, Rajendiran Prakash, spoken English institute history, milestones, values, Tamil Nadu, Kerala, English training excellence' }]
    ]});

    // Check setCanonicalURL
    expect(seoLog).toContainEqual({ method: 'setCanonicalURL', args: ['https://www.elpn.example.com/about'] });

    // Check setOpenGraph
    expect(seoLog).toContainEqual({ method: 'setOpenGraph', args: [
      expect.objectContaining({
        title: 'About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Learn about ELPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.',
        type: 'website'
      })
    ]});

    // Check setTwitterCard
    expect(seoLog).toContainEqual({ method: 'setTwitterCard', args: [
      expect.objectContaining({
        title: 'About ELPN — ENGLISH LANGUAGE PRESENTAION NETWORK',
        description: 'Learn about ELPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.'
      })
    ]});

    // Check setStructuredData
    expect(seoLog).toContainEqual({ method: 'setStructuredData', args: [expect.any(Object)] });
  });
});