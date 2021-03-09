import { HasPaidPipe } from './has-paid.pipe';

describe('HasPaidPipe', () => {
  it('create an instance', () => {
    const pipe = new HasPaidPipe();
    expect(pipe).toBeTruthy();
  });
});
