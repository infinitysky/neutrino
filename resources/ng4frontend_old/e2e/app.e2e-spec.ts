import { Ng4frontendPage } from './app.po';

describe('ng4frontend App', () => {
  let page: Ng4frontendPage;

  beforeEach(() => {
    page = new Ng4frontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
