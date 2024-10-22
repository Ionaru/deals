import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

import { appName } from "../app.config";

@Injectable({ providedIn: "root" })
export class MyTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.#title.setTitle(`${appName} | ${title}`);
    }
  }
}
