import { ComponentFixture, TestBed } from "@angular/core/testing";

import { setComponentInput } from "../../../testing/mocks";

import { PriceCurrentComponent } from "./price-current.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("PriceCurrentComponent", () => {
  let component: PriceCurrentComponent;
  let fixture: ComponentFixture<PriceCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCurrentComponent);

    setComponentInput(fixture.componentRef, "amount", 100);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
