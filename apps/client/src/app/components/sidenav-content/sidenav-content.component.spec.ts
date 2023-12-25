import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TypedMockProvider } from "../../../testing/mocks";
import { NavigationService } from "../../services/navigation.service";

import { SidenavContentComponent } from "./sidenav-content.component";

describe("SidenavContentComponent", () => {
  let component: SidenavContentComponent;
  let fixture: ComponentFixture<SidenavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TypedMockProvider(NavigationService, { routes$$: signal([]) }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
