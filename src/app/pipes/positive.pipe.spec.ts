import { PositivePipe } from './positive.pipe';

describe('PositivePipe', () => {
  it('create an instance', () => {
    const pipe = new PositivePipe();
    expect(pipe).toBeTruthy();
  });
});
