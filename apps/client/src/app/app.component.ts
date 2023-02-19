import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    imports: [RouterOutlet],
    selector: 'deals-root',
    standalone: true,
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    public title = 'client';
}
