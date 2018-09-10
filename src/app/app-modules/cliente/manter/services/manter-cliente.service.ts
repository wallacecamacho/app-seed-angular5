
import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../../../environments/environment';
import { HttpErrorHandler, HandleError } from 'porto-sofea-lib';
import * as _ from 'lodash';

@Injectable()
export class CadastroClienteService {
 private handleError: HandleError;
 private clienteUrnEndpoint = env.apiUrl;

 constructor(
   private http: HttpClient,
   private httpErrorHandler: HttpErrorHandler) {
   this.handleError = httpErrorHandler.createHandleError('CadastroClienteService');
 }

 /** GET Clientes from the server */
 public getClientes (): Observable<any> {
   return this.http.get<any>(this.clienteUrnEndpoint + '/clientes')
   .pipe(
     map( result => _.orderBy(result.dados, ['id'], ['desc']) ), // Ordena por id por ordem decrescente
     catchError(this.handleError(env.appName, 'getClientes', []))
    );
 }

 /** POST: add a new Clientes to the database */
 public adicionarCliente (cliente: Cliente): Observable<Cliente> {
   return this.http.post<Cliente>(this.clienteUrnEndpoint, cliente)
     .pipe(
       catchError(this.handleError(env.appName, 'adicionarCliente', cliente))
     );
 }

 /** DELETE: delete the Clientes from the server */
 public removerCliente (id: number): Observable<{}> {
   const url = `${this.clienteUrnEndpoint}/${id}`; // DELETE api/heroes/42
   return this.http.delete(url)
     .pipe(
       catchError(this.handleError('removerCliente'))
     );
 }

 /** PUT: update the Clientes on the server. Returns the updated hero upon success. */
 public atualizarCliente (cliente: Cliente): Observable<Cliente> {
   return this.http.put<Cliente>(this.clienteUrnEndpoint, cliente)
     .pipe(
       catchError(this.handleError(env.appName, 'atualizarCliente', cliente))
     );
 }

}

