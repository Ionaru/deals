import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApolloTestingModule } from "apollo-angular/testing";
import { of } from "rxjs";

import { TypedMockProvider } from "../../../testing/mocks.js";
import { HealthService } from "../../services/health.service.js";

import { AdminComponent } from "./admin.component.js";

describe("adminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
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
