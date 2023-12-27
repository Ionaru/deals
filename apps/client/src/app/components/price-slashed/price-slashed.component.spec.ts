import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PriceSlashedComponent } from "./price-slashed.component";

describe("PriceSlashedComponent", () => {
  let component: PriceSlashedComponent;
  let fixture: ComponentFixture<PriceSlashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceSlashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
