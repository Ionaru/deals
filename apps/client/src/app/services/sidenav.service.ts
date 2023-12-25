import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  readonly #emitter = new EventEmitter<never>();
  readonly opened$ = this.#emitter.asObservable();

  open() {
    this.#emitter.emit();
  }
}
