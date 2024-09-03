import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleOptionsMenuComponent } from './multiple-options-menu.component';

describe('MultipleOptionsMenuComponent', () => {
  let component: MultipleOptionsMenuComponent;
  let fixture: ComponentFixture<MultipleOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleOptionsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
