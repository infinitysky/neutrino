import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'truncate'
})
export class TruncatePipe implements PipeTransform  {
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
//
// @Pipe({name: 'exponentialStrength'})
// export class ExponentialStrengthPipe implements PipeTransform {
//   transform(value: number, exponent: string): number {
//     let exp = parseFloat(exponent);
//     return Math.pow(value, isNaN(exp) ? 1 : exp);
//   }
// }
