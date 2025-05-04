import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { DealsQueryInputComponent } from "./deals-query-input.component.js";

describe("DealsQueryInputComponent", () => {
  let component: DealsQueryInputComponent;
  let fixture: ComponentFixture<DealsQueryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
