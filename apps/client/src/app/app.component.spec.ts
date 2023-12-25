import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconRegistry } from "@angular/material/icon";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { overrideComponents, TypedMockProvider } from "../testing/mocks";

import { AppComponent } from "./app.component";
import { SidenavContainerComponent } from "./components/sidenav-container/sidenav-container.component";
import { SidenavContentComponent } from "./components/sidenav-content/sidenav-content.component";
import { SignupButtonComponent } from "./components/signup-button/signup-button.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AuthService } from "./services/auth.service";

describe("appComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockGetUser = jest.fn();
  const mockSetDefaultFontSetClass = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      providers: [
        TypedMockProvider(AuthService, { getUser: mockGetUser }),
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

  it("should get the user on init", () => {
    expect.assertions(1);
    expect(mockGetUser).toHaveBeenCalled();
  });

  it("should correctly change the default iconset", () => {
    expect.assertions(1);
    expect(mockSetDefaultFontSetClass).toHaveBeenCalledWith(
      "material-symbols-outlined",
    );
  });
});
