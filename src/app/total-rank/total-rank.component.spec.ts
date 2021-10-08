import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRankComponent } from './total-rank.component';

describe('TotalRankComponent', () => {
  let component: TotalRankComponent;
  let fixture: ComponentFixture<TotalRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
