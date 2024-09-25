import { ErrorTranslatorPipe } from './error-translator.pipe';

describe('ErrorTranslatorPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorTranslatorPipe();
    expect(pipe).toBeTruthy();
  });
});
