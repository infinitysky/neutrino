import { ReportAngular2Page } from './app.po';

describe('report-angular2 App', function() {
  let page: ReportAngular2Page;

  beforeEach(() => {
    page = new ReportAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
