import { ChordLabPage } from './app.po';

describe('chord-lab App', () => {
  let page: ChordLabPage;

  beforeEach(() => {
    page = new ChordLabPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
