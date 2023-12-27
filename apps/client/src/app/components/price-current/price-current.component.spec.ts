import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PriceCurrentComponent } from "./price-current.component";

describe("PriceCurrentComponent", () => {
  let component: PriceCurrentComponent;
  let fixture: ComponentFixture<PriceCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
