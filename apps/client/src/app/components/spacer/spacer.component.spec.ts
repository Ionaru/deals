import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SpacerComponent } from "./spacer.component.js";

describe("SpacerComponent", () => {
  let component: SpacerComponent;
  let fixture: ComponentFixture<SpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
