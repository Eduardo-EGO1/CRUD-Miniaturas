import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutosService } from '../../service/produtos-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Produto } from '../../model/produto';
type ProdutoCreate = Omit<Produto, 'id'>;

@Component({
  selector: 'app-form-produtos',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-produtos.html',
  styleUrl: './form-produtos.css',
})
export class FormProdutos {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProdutosService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [0],
      category: [''],
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    formValue.price = Number(formValue.price);

    const produtoParaCriar: ProdutoCreate = formValue;

    delete formValue.id;

    this.service.create(produtoParaCriar).subscribe({
      next: (v) => this.onSucess(),
      error: (e) =>
        this.snackBar.open(`Erro ao salvar: ${e.message || e.statusText}`, 'Fechar', {
          duration: 3000,
        }),
      complete: () => console.info('Criação de produto completa'),
    });
  }

  onSucess() {
    this.snackBar.open('Produto Salvo com Sucesso!', '', { duration: 1000 });
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
