import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleOptionsMenuItemComponent } from './multiple-options-menu-item.component';

describe('MultipleOptionsMenuItemComponent', () => {
  let component: MultipleOptionsMenuItemComponent;
  let fixture: ComponentFixture<MultipleOptionsMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleOptionsMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleOptionsMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
