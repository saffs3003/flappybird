import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizerCanvasComponent } from './equalizer-canvas.component';

describe('EqualizerCanvasComponent', () => {
  let component: EqualizerCanvasComponent;
  let fixture: ComponentFixture<EqualizerCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EqualizerCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EqualizerCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
