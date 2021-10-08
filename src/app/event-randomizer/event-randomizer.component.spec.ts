import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRandomizerComponent } from './event-randomizer.component';

describe('EventRandomizerComponent', () => {
  let component: EventRandomizerComponent;
  let fixture: ComponentFixture<EventRandomizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRandomizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRandomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
