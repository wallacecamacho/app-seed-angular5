import { Language } from 'angular-l10n';
import { Component, Inject, Input, OnChanges, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { DialogMessageComponent } from './dialog-message.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroClienteService } from '../services/manter-cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-dialog-editar-cliente',
  templateUrl: 'alterar-cliente.component.html'
})
export class DialogEditarClienteComponent implements OnChanges, OnInit {

  @Language()
  public lang: string;
  private _submitted = false;
  @Input() cliente: Cliente;
  result = null;
  loading = true;
  error = false;
  statusNotify = '';

  listUf = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO'
  ];

  form = this.formBuilder.group({
    id: [],
    nome: [
      '',
      Validators.compose([Validators.required, Validators.minLength(7)])
    ],
    endereco: [
      '',
      Validators.compose([Validators.required, Validators.minLength(7)])
    ],
    telefone: ['', Validators.compose([Validators.required])],
    dataNascimento: ['', Validators.compose([Validators.required])],
    sexo: ['', Validators.compose([Validators.required])],
    cidade: ['', Validators.compose([Validators.required])],
    uf: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public clienteService: CadastroClienteService
  ) {
    this.cliente = data.clienteEdit;
  }

  ngOnInit() {
    this.form.reset({
      id: this.cliente.id,
      nome: this.cliente.nome,
      endereco: this.cliente.endereco,
      telefone: this.cliente.telefone,
      dataNascimento: this.cliente.dataNascimento,
      sexo: this.cliente.sexo,
      cidade: this.cliente.cidade,
      uf: this.cliente.uf
    });
  }

  ngOnChanges() {
    this.form.reset({
      id: this.cliente.id,
      nome: this.cliente.nome,
      endereco: this.cliente.endereco,
      telefone: this.cliente.telefone,
      dataNascimento: this.cliente.dataNascimento,
      sexo: this.cliente.sexo,
      cidade: this.cliente.cidade,
      uf: this.cliente.uf
    });
  }

  public getSubmitted() {
    return this._submitted;
  }

  public submit() {
    this._submitted = true;
    if (this.form.valid) {
      this.form.value.dataNascimento = this.parseDate(
        this.form.value.dataNascimento
      );
      this.clienteService
        .atualizarCliente(this.form.value)
        .do(() => {
          this.result = [];
          this.loading = true;
          this.error = false;
        })
        .subscribe(
          result => {
            this.result = result;
            this.statusNotify = 'success';
            this._submitted = false;
          },
          err => {
            this.error = err;
            this.statusNotify = 'erro';
          },
          () => {
            this.statusNotify = '';
          }
        );
      this.openDialogMessage('sucesso', 'Cliente atualizado com sucesso');
    }
  }

  private openDialogMessage(status: string, message: string) {
    this.dialog.open(DialogMessageComponent, {
      width: '490px',
      data: {
        status: status,
        message: message,
        info: 'Informação'
      }
    });
  }

  @HostListener('click', ['$event'])
  onClose(e) {
    // e.stopPropagation();
    this.dialog.closeAll();
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

  parseDate(dateString: any): Date {
    if (dateString) {
      const date = dateString.split('-');
      // date = date[2] + '-' + date[1] + '-' + date[0];
      this.form.value.dataNascimento = dateString;
      return dateString;
    } else {
      return null;
    }
  }
}
