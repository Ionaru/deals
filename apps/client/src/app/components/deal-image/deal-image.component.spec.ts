import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DealImageComponent } from "./deal-image.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("DealImageComponent", () => {
  let component: DealImageComponent;
  let fixture: ComponentFixture<DealImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealImageComponent);
    fixture.componentRef.setInput("productImageUrl", "productImageUrl");
    fixture.componentRef.setInput("productName", "productName");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
