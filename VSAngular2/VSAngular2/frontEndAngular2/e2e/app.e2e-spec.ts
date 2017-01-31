import { FrontEndAngular2Page } from './app.po';

describe('front-end-angular2 App', function() {
  let page: FrontEndAngular2Page;

  beforeEach(() => {
    page = new FrontEndAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
