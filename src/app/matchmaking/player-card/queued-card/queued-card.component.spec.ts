import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedCardComponent } from './queued-card.component';

describe('QueuedCardComponent', () => {
  let component: QueuedCardComponent;
  let fixture: ComponentFixture<QueuedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueuedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueuedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
