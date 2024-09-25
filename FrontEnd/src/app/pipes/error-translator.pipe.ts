import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorTranslator'
})
export class ErrorTranslatorPipe implements PipeTransform {

  private errorTranslations: { [key: string]: string } = {
    'invalid password': 'Credenziali errate o non valide',
    'email not confirmed': 'La email non è stata confermata'
  };

  transform(value: string): string {
    return this.errorTranslations[value] || value;
  }

}
