import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographychartComponent } from './demographychart.component';

describe('DemographychartComponent', () => {
  let component: DemographychartComponent;
  let fixture: ComponentFixture<DemographychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographychartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
