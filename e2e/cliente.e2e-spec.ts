import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';


describe('Manter Clientes Testes', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });



  it('adicionar cliente', function() {
    page.navigateToCliente();

   element(by.css('input[formControlName=nome]')).sendKeys('testess');
   element(by.id('nome')).sendKeys( 'asdasdsds' );
   element(by.id('endereco')).sendKeys( 'asdasdsdsd' );
   element(by.id('telefone')).sendKeys( '21997729023' );
   element(by.id('cidade')).sendKeys( 'Rio de Janeiro' );
   element(by.id('dataNascimento')).sendKeys( '01/30/2015' );
   element(by.id('uf')).sendKeys( 'RJ' );
   element(by.id('sexo')).sendKeys( 'M' );

    /*const registerButton = element(by.buttonText('Salvar'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(registerButton), 5000);
    registerButton.click();
    expect(registerButton.getText()).toBe('SALVAR');*/

    // const login_form = element(by.id('form'));
    // expect(login_form.submit()).toEqual('sucesso');

     element(by.id('salvar')).click();

   // expect(element(by.binding('latest')).getText()).toEqual('3'); // This is wrong!
  });
});
