import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks";
import { HealthService } from "../../services/health.service";

import { AdminComponent } from "./admin.component";

describe("adminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TypedMockProvider(HealthService, {
          services$: of(),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
