import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks";
import { AuthService } from "../../services/auth.service";

import { LoginComponent } from "./login.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

describe.only("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideRouter([]),
        provideExperimentalZonelessChangeDetection(),
        TypedMockProvider(AuthService, {
          isLoggedIn$: of(false),
          user$: of(null),
        }),
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
