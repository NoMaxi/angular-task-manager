import { FilterBySearchTextPipe } from './filter-by-search-text.pipe';

describe('SearchByPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterBySearchTextPipe();
    expect(pipe).toBeTruthy();
  });
});
