import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks";

import { PriceSlashedComponent } from "./price-slashed.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("PriceSlashedComponent", () => {
  let component: PriceSlashedComponent;
  let fixture: ComponentFixture<PriceSlashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
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
