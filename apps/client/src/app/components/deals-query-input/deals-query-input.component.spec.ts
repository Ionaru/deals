import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { DealsQueryInputComponent } from "./deals-query-input.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

describe("DealsQueryInputComponent", () => {
  let component: DealsQueryInputComponent;
  let fixture: ComponentFixture<DealsQueryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DealsQueryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
