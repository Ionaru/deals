import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SerializationService {
  readonly #encoder = new TextEncoder();
  readonly #decoder = new TextDecoder("utf8");

  encode(data: string) {
    return this.#encoder.encode(data);
  }

  decode(data: ArrayBuffer) {
    return this.#decoder.decode(data);
  }

  toBase64(data: ArrayBuffer) {
    return btoa(String.fromCodePoint(...new Uint8Array(data)));
  }
}
