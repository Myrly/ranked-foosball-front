import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublesTeamMethodComponent } from './doubles-team-method.component';

describe('DoublesTeamMethodComponent', () => {
  let component: DoublesTeamMethodComponent;
  let fixture: ComponentFixture<DoublesTeamMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoublesTeamMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoublesTeamMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
