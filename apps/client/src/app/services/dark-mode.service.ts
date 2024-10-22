import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { SESSION_STORAGE, WINDOW } from "../../tokens/injection-tokens";

/**
 * Service to toggle dark mode.
 * Will first attempt to read a preference from sessionStorage,
 * if not found, will fall back to the system preference.
 */
@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  readonly #document = inject(DOCUMENT);
  readonly #storage = inject(SESSION_STORAGE);
  readonly #window = inject(WINDOW);

  readonly #isDarkModeActive$ = new BehaviorSubject(false);

  readonly #storageKey = "mode";
  readonly #darkModeClass = "dark-mode";
  readonly #darkModeMediaQuery = "(prefers-color-scheme: dark)";
  readonly #darkModePreference = "dark";
  readonly #lightModePreference = "light";

  constructor() {
    const preference = this.#storage.getItem(this.#storageKey);
    if (preference === this.#darkModePreference) {
      this.enableDarkMode();
    } else if (preference === this.#lightModePreference) {
      this.disableDarkMode();
    } else {
      if (this.#window.matchMedia(this.#darkModeMediaQuery).matches) {
        this.enableDarkMode();
      }
    }

    this.#window
      .matchMedia(this.#darkModeMediaQuery)
      .addEventListener("change", (changeEvent) => {
        if (changeEvent.matches) {
          this.enableDarkMode();
        } else {
          this.disableDarkMode();
        }
      });
  }

  isDarkModeActive(): boolean {
    return this.#document.body.classList.contains(this.#darkModeClass);
  }

  isDarkModeActive$(): Observable<boolean> {
    return this.#isDarkModeActive$;
  }

  enableDarkMode(save = false): void {
    this.#isDarkModeActive$.next(true);
    this.#document.body.classList.add(this.#darkModeClass);
    if (save) {
      this.#save(this.#darkModePreference);
    }
  }

  disableDarkMode(save = false): void {
    this.#isDarkModeActive$.next(false);
    this.#document.body.classList.remove(this.#darkModeClass);
    if (save) {
      this.#save(this.#lightModePreference);
    }
  }

  toggleDarkMode(): void {
    if (this.isDarkModeActive()) {
      this.disableDarkMode(true);
    } else {
      this.enableDarkMode(true);
    }
  }

  #save(preference: string): void {
    this.#storage.setItem(this.#storageKey, preference);
  }
}
