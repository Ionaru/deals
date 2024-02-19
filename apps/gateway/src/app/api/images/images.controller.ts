import { Readable } from "node:stream";

import { Controller, Get, Header, Query, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("/api/images")
export class ImagesController {
  @Get()
  @Header("Cache-Control", "max-age=31536000, public")
  async proxyImage(@Query("url") url: string, @Res() response: Response) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const readableStream = await fetch(url).then((r) =>
      Readable.fromWeb(r.body!),
    );
    readableStream.pipe(response);
  }
}
