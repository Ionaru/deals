import { DOCUMENT, NgOptimizedImage } from "@angular/common";
import { Component, effect, inject, input, signal } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

import { generateNumbersArray } from "../../utils/generate-numbers-array";

@Component({
  imports: [NgOptimizedImage, MatProgressSpinner],
  selector: "deals-deal-image",
  standalone: true,
  styleUrl: "./deal-image.component.css",
  templateUrl: "./deal-image.component.html",
})
export class DealImageComponent {
  productImageUrl = input.required<string>();
  productName = input.required<string>();

  #document = inject(DOCUMENT);

  productImageData = signal<string | null>(null);

  constructor() {
    effect(
      async () => {
        const canvas = this.#document.createElement("canvas");
        const image = new Image();
        image.src =
          "/api/images?url=" + encodeURIComponent(this.productImageUrl());
        image.addEventListener("load", () => {
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          if (!context) {
            return;
          }
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageData = context.getImageData(
            0,
            0,
            image.width,
            image.height,
          );
          const pixels = imageData.data;

          const whiteLevel = 249;

          this.#checkWhiteFromTop(image, pixels, whiteLevel);
          this.#checkWhiteFromRight(image, pixels, whiteLevel);
          this.#checkWhiteFromBottom(image, pixels, whiteLevel);
          this.#checkWhiteFromLeft(image, pixels, whiteLevel);

          context.putImageData(imageData, 0, 0);
          this.productImageData.set(canvas.toDataURL("image/png"));
        });
      },
      { allowSignalWrites: true },
    );
  }

  #checkWhiteFromLeft(
    image: HTMLImageElement,
    pixels: Uint8ClampedArray,
    whiteLevel: number,
  ) {
    const leftMostPixels = generateNumbersArray(
      image.height,
      0,
      image.width * 4,
    );
    for (const startPixel of leftMostPixels) {
      for (
        let index = startPixel;
        index < startPixel + image.width * 4;
        index += 4
      ) {
        const transformed = this.#transformPixel(pixels, index, whiteLevel);
        if (!transformed) {
          break;
        }
      }
    }
  }

  #checkWhiteFromRight(
    image: HTMLImageElement,
    pixels: Uint8ClampedArray,
    whiteLevel: number,
  ) {
    const rightMostPixels = generateNumbersArray(
      image.height,
      image.width * 4 - 4,
      image.width * 4,
    );
    for (const startPixel of rightMostPixels) {
      for (
        let index = startPixel;
        index > startPixel - image.width * 4;
        index -= 4
      ) {
        const transformed = this.#transformPixel(pixels, index, whiteLevel);
        if (!transformed) {
          break;
        }
      }
    }
  }

  #checkWhiteFromTop(
    image: HTMLImageElement,
    pixels: Uint8ClampedArray,
    whiteLevel: number,
  ) {
    const topMostPixels = generateNumbersArray(image.width * 4, 0, 4);
    for (const startPixel of topMostPixels) {
      for (
        let index = startPixel;
        index < pixels.length;
        index += image.width * 4
      ) {
        const transformed = this.#transformPixel(pixels, index, whiteLevel);
        if (!transformed) {
          break;
        }
      }
    }
  }

  #checkWhiteFromBottom(
    image: HTMLImageElement,
    pixels: Uint8ClampedArray,
    whiteLevel: number,
  ) {
    const bottomMostPixels = generateNumbersArray(
      image.width * 4,
      (image.height - 1) * image.width * 4,
      4,
    );
    for (const startPixel of bottomMostPixels) {
      for (let index = startPixel; index >= 0; index -= image.width * 4) {
        const transformed = this.#transformPixel(pixels, index, whiteLevel);
        if (!transformed) {
          break;
        }
      }
    }
  }

  #transformPixel(
    pixels: Uint8ClampedArray,
    index: number,
    whiteLevel: number,
  ) {
    const r = 0;
    const g = 1;
    const b = 2;
    const a = 3;
    const red = pixels[index + r] || 0;
    const green = pixels[index + g] || 0;
    const blue = pixels[index + b] || 0;
    const alpha = pixels[index + a] || 0;
    if (
      !alpha ||
      (red >= whiteLevel && green >= whiteLevel && blue >= whiteLevel)
    ) {
      pixels[index + a] = 0;
      return true;
    }
    return false;
  }
}
