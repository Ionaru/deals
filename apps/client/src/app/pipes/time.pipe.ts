import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time",
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: unknown, ..._arguments: unknown[]): unknown {
    if (typeof value !== "number") {
      return value;
    }

    const hours = Math.floor(value / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((value % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, "0");

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
