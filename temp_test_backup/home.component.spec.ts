import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let seoService: jasmine.SpyObj<SeoService>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const seoSpy = jasmine.createSpyObj('SeoService', [
      'setTitle',
      'updateMetaTags',
      'setCanonicalURL',
      'setOpenGraph',
      'setTwitterCard',
      'setStructuredData'
    ]);
    const dataSpy = jasmine.createSpyObj('DataService', [
      'getCourses',
      'getTestimonials',
      'getStats',
      'getProcessSteps',
      'getWhyJoinReasons'
    ]);

    // Mock data service return values
    dataSpy.getCourses.and.returnValue([]);
    dataSpy.getTestimonials.and.returnValue([]);
    dataSpy.getStats.and.returnValue([]);
    dataSpy.getProcessSteps.and.returnValue([]);
    dataSpy.getWhyJoinReasons.and.returnValue([]);

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SEO service methods on init', () => {
    // Call ngOnInit
    component.ngOnInit();

    // Verify SEO service methods were called
    expect(seoService.setTitle).toHaveBeenCalledWith(
      'ESPN — English Speaking Presentation Network | Spoken English Classes'
    );

    expect(seoService.updateMetaTags).toHaveBeenCalledWith([
      { name: 'description', content: 'ESPN (English Speaking Presentation Network) offers the best spoken English online classes. Founded in 2009 by Rajendiran Prakas. Serving Tamil Nadu & Kerala for 17+ years. Call: +91 8778656159' },
      { name: 'keywords', content: 'spoken english classes, spoken english online, english speaking classes, ESPN english, Rajendiran Prakas, Tamil Nadu english classes, Kerala english classes, interview preparation, public speaking' },
      { name: 'author', content: 'ESPN — English Speaking Presentation Network' }
    ]);

    expect(seoService.setCanonicalURL).toHaveBeenCalledWith('https://www.espn.example.com/');

    expect(seoService.setOpenGraph).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'ESPN — Spoken English Online Classes | Tamil Nadu & Kerala',
        description: 'Transform your English with 17+ years of proven coaching. 10,000+ students trained. Enroll today!',
        type: 'website'
      })
    );

    expect(seoService.setTwitterCard).toHaveBeenCalledWith(
      jasmine.objectContaining({
        card: 'summary_large_image',
        title: 'ESPN — Spoken English Online Classes | Tamil Nadu & Kerala',
        description: 'Transform your English with 17+ years of proven coaching. 10,000+ students trained. Enroll today!'
      })
    );

    expect(seoService.setStructuredData).toHaveBeenCalledWith(
      jasmine.any(Object)
    );
  });
});