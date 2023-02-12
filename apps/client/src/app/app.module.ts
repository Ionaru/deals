import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking',
        }),
    ],
    providers: [],
})
export class AppModule {}
