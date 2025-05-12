import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { AuthService } from "../../services/auth.service.js";
import { WebauthnService } from "../../services/webauthn.service.js";

import { LoginComponent } from "./login.component.js";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TypedMockProvider(AuthService, {
          user$: of(null),
        }),
        TypedMockProvider(WebauthnService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
