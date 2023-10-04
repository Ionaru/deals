import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRequest } from '@deals/api';

@Injectable({
    providedIn: 'root',
})
export class GatewayService {
    readonly #url = '/api/';

    readonly #http = inject(HttpClient);

    get<T extends keyof IRequest>(path: T, parameters: IRequest[T]['request']) {
        return this.#http.get<IRequest[T]['response']>(`${this.#url}${path}`, {
            params: parameters,
        });
    }

    post<T extends keyof IRequest>(path: T, data: IRequest[T]['request']) {
        return this.#http.post<IRequest[T]['response']>(
            `${this.#url}${path}`,
            data,
        );
    }
}
