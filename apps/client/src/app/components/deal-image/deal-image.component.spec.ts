import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DealImageComponent } from "./deal-image.component";

xdescribe("DealImageComponent", () => {
  let component: DealImageComponent;
  let fixture: ComponentFixture<DealImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DealImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
