import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import appRouting from './app/app.routing';
import { mockDataInterceptor } from './app/interceptors/mock-data.interceptor';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRouting),
        provideHttpClient(
            withInterceptors(
                environment.production ? [] : [mockDataInterceptor],
            ),
        ),
        provideAnimations(),
    ],
    // eslint-disable-next-line no-console
}).catch((error) => console.error(error));
