const packageJson = require('../../package.json');

export const environment = {
  appName: 'Porto SOFEA Angular Starter',
  envName: 'PROD',
  production: true,
  contextRoot: '/sofea-referencia',
  apiUrl: '/sofea-fase2Service/api/dadoscliente',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};
