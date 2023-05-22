import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment';
import {
    LOCAL_STORAGE,
    SESSION_STORAGE,
    WINDOW,
} from '../tokens/injection-tokens';

import appRouting from './app.routing';
import { mockDataInterceptor } from './interceptors/mock-data.interceptor';

export const appConfig: ApplicationConfig = {
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
};
