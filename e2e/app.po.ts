import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToCliente() {
    return browser.get('/#/cliente');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
