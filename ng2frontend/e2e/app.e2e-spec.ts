import { Ng2frontendPage } from './app.po';

describe('ng2frontend App', () => {
  let page: Ng2frontendPage;

  beforeEach(() => {
    page = new Ng2frontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
