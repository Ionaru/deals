import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconRegistry } from "@angular/material/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { overrideComponents, TypedMockProvider } from "../testing/mocks.js";

import { AppComponent } from "./app.component.js";
import { SidenavContainerComponent } from "./components/sidenav-container/sidenav-container.component.js";
import { SidenavContentComponent } from "./components/sidenav-content/sidenav-content.component.js";
import { SignupButtonComponent } from "./components/signup-button/signup-button.component.js";
import { ToolbarComponent } from "./components/toolbar/toolbar.component.js";
import { AuthService } from "./services/auth.service.js";

describe("appComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockSetDefaultFontSetClass = vi.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      providers: [
        TypedMockProvider(AuthService, { init$: of() }),
        TypedMockProvider(MatIconRegistry, {
          setDefaultFontSetClass: mockSetDefaultFontSetClass,
        }),
      ],
    })
      .overrideComponent(
        AppComponent,
        overrideComponents(
          ToolbarComponent,
          SignupButtonComponent,
          SidenavContentComponent,
        ),
      )
      .overrideComponent(
        SidenavContainerComponent,
        overrideComponents(SidenavContentComponent),
      )
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    expect.assertions(1);
    expect(component.title).toBe("BargainBee");
  });

  it("should correctly change the default iconset", () => {
    expect.assertions(1);
    expect(mockSetDefaultFontSetClass).toHaveBeenCalledWith(
      "material-symbols-outlined",
    );
  });
});
