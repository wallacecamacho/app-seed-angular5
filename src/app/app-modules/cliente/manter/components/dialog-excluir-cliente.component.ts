import { Language } from 'angular-l10n';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogMessageComponent } from './dialog-message.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroClienteService } from '../services/manter-cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-dialog-editar-cliente',
  template: 'dialog-message.component.html',
})
export class DialogExcluirClienteComponent implements OnChanges, OnInit {

  @Language()
  public lang: string;
  private _submitted = false;
  @Input()
  cliente: Cliente;

  form = this.formBuilder.group({
    id: [],
    nome: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
    endereco: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
    telefone: ['', Validators.compose([Validators.required])],
    cidade: ['', Validators.compose([Validators.required])],
    uf: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder,  public dialog: MatDialog,
    public clienteService: CadastroClienteService) {
    this.cliente = data.clienteEdit;
  }

  ngOnInit() {
    this.form.reset({
      id: this.cliente.id,
      nome: this.cliente.nome,
      endereco: this.cliente.endereco,
      telefone: this.cliente.telefone,
      cidade: this.cliente.cidade,
      uf: this.cliente.uf,
    });
  }

  ngOnChanges() {
    this.form.reset({
      id: this.cliente.id,
      nome: this.cliente.nome,
      endereco: this.cliente.endereco,
      telefone: this.cliente.telefone,
      cidade: this.cliente.cidade,
      uf: this.cliente.uf,
    });
  }

  public getSubmitted() {
    return this._submitted;
  }

  public submit() {
    this._submitted = true;
    if (this.form.valid) {
      this.clienteService.atualizarCliente(this.form.value).subscribe();
      this.openDialogMessage('sucesso', 'Cliente atualizado com sucesso');
    }
  }

  private openDialogMessage(status: string, message: string) {
    this.dialog.open(DialogMessageComponent, {
      data: {
        status: status,
        message: message
      }
    });
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

}
