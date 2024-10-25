import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataPage} from './data.page';

describe('DataComponent', () => {
  let component: DataPage;
  let fixture: ComponentFixture<DataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load air quality chart on init', () => {
    spyOn(component, 'loadAirQualityChart');
    component.ngOnInit();
    expect(component.loadAirQualityChart).toHaveBeenCalled();
  });
});
