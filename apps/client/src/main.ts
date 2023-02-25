import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import appRouting from './app/app.routing';
import { mockDataInterceptor } from './app/interceptors/mock-data.interceptor';
import { environment } from './environments/environment';
import {
    LOCAL_STORAGE,
    SESSION_STORAGE,
    WINDOW,
} from './tokens/injection-tokens';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRouting),
        provideHttpClient(
            withInterceptors(
                environment.production ? [] : [mockDataInterceptor],
            ),
        ),
        provideAnimations(),
        { provide: LOCAL_STORAGE, useValue: localStorage },
        { provide: SESSION_STORAGE, useValue: sessionStorage },
        { provide: WINDOW, useValue: window },
    ],
    // eslint-disable-next-line no-console
}).catch((error) => console.error(error));
