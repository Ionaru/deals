import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DealProblemButtonComponent } from "./deal-problem-button.component.js";

describe("DealProblemButtonComponent", () => {
  let component: DealProblemButtonComponent;
  let fixture: ComponentFixture<DealProblemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DealProblemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
