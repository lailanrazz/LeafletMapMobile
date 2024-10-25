import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPage],
    }).compileComponents(); // Menggunakan compileComponents, bukan compilePages
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage); // Menggunakan createComponent, bukan createPage
    component = fixture.componentInstance; // Menggunakan componentInstance
    fixture.detectChanges(); // Memicu deteksi perubahan untuk memperbarui template
  });

  // Test untuk memastikan komponen dibuat
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test untuk memeriksa apakah judul benar
  it('should have the correct title', () => {
    expect(component.title).toEqual('Dashboard Pemantauan Karbon');
  });

  // Test untuk memeriksa apakah fitur dimuat dengan benar
  it('should have three features', () => {
    expect(component.features.length).toBe(3);
  });

  // Test untuk memastikan fitur pertama memiliki judul yang benar
  it('should have correct title for the first feature', () => {
    const firstFeature = component.features[0];
    expect(firstFeature.title).toEqual('Informasi CCS (Carbon Capture and Storage)');
  });
});
