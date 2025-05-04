import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { AuthService } from "../../services/auth.service.js";

import { SignupButtonComponent } from "./signup-button.component.js";

describe("SignupButtonComponent", () => {
  let component: SignupButtonComponent;
  let fixture: ComponentFixture<SignupButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TypedMockProvider(AuthService, { isLoggedIn$: of(false) })],
    });
    fixture = TestBed.createComponent(SignupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
