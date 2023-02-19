import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IHTTPAPI } from '@deals/api';

@Injectable({
    providedIn: 'root',
})
export class GatewayService {
    private static readonly url = '/api/';

    readonly #http = inject(HttpClient);

    public get<T extends keyof IHTTPAPI>(
        path: T,
        parameters: IHTTPAPI[T]['request'],
    ) {
        return this.#http.get<IHTTPAPI[T]['response']>(
            `${GatewayService.url}${path}`,
            { params: parameters },
        );
    }

    public post<T extends keyof IHTTPAPI>(
        path: T,
        data: IHTTPAPI[T]['request'],
    ) {
        return this.#http.post<IHTTPAPI[T]['response']>(
            `${GatewayService.url}${path}`,
            data,
        );
    }
}
