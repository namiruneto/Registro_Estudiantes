import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoportComponent } from './soport.component';

describe('SoportComponent', () => {
  let component: SoportComponent;
  let fixture: ComponentFixture<SoportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
