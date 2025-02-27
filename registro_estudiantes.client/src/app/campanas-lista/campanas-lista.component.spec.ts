import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanasListaComponent } from './campanas-lista.component';

describe('CampanasListaComponent', () => {
  let component: CampanasListaComponent;
  let fixture: ComponentFixture<CampanasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampanasListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
