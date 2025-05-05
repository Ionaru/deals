import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { NavigationService } from "../../services/navigation.service.js";

import { SidenavContainerComponent } from "./sidenav-container.component.js";

describe("SidenavContainerComponent", () => {
  let component: SidenavContainerComponent;
  let fixture: ComponentFixture<SidenavContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      providers: [
        TypedMockProvider(NavigationService, { routes$$: signal([]) }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
