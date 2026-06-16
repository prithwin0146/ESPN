import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { SeoService } from '../../core/services/seo.service';
import { DataService } from '../../core/services/data.service';
import { of } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
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
      'getMilestones',
      'getValues'
    ]);

    // Mock data service return values
    dataSpy.getMilestones.and.returnValue([]);
    dataSpy.getValues.and.returnValue([]);

    TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        { provide: SeoService, useValue: seoSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    component = TestBed.createComponent(AboutComponent).componentInstance;
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
      'About ESPN — English Speaking Presentation Network'
    );

    expect(seoService.updateMetaTags).toHaveBeenCalledWith([
      { name: 'description', content: 'Learn about ESPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.' },
      { name: 'keywords', content: 'About ESPN, English Speaking Presentation Network, Rajendiran Prakas, spoken English institute history, milestones, values, Tamil Nadu, Kerala, English training excellence' }
    ]);

    expect(seoService.setCanonicalURL).toHaveBeenCalledWith('https://www.espn.example.com/about');

    expect(seoService.setOpenGraph).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'About ESPN — English Speaking Presentation Network',
        description: 'Learn about ESPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.',
        type: 'website'
      })
    );

    expect(seoService.setTwitterCard).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'About ESPN — English Speaking Presentation Network',
        description: 'Learn about ESPN\'s 17+ year journey of excellence in spoken English training. Meet our founder, explore our milestones, and discover our core values that drive student success.'
      })
    );

    expect(seoService.setStructuredData).toHaveBeenCalledWith(
      jasmine.any(Object)
    );
  });
});