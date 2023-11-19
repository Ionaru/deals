import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks";
import { AuthService } from "../../services/auth.service";
import { DarkModeService } from "../../services/dark-mode.service";

import { ToolbarComponent } from "./toolbar.component";

describe("toolbarComponent", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TypedMockProvider(AuthService, { isLoggedIn$: of(false) }),
        TypedMockProvider(DarkModeService, { isDarkModeActive: () => false }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
