import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks.js";

import { PriceSlashedComponent } from "./price-slashed.component.js";

describe("PriceSlashedComponent", () => {
  let component: PriceSlashedComponent;
  let fixture: ComponentFixture<PriceSlashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceSlashedComponent);

    setComponentInput(fixture.componentRef, "amount", 100);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
