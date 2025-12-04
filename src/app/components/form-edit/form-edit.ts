import { Component } from '@angular/core';
import { Produto } from '../../model/produto';
import { ProdutosService } from '../../service/produtos-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-edit-produto',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-edit.html',
  styleUrl: './form-edit.css',
})
export class FormEditProduto {
  p$: Observable<Produto>;
  form: FormGroup;
  constructor(
    private servicoProduto: ProdutosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    let id = this.route.snapshot.queryParamMap.get('id');
    this.p$ = this.servicoProduto.getOne(id!);
    this.form = this.formBuilder.group({
      id: [null],
      name: [''],
      description: [''],
      price: [0],
      category: [''],
    });
    this.p$.subscribe((j) => {
      this.form.patchValue({
        id: j.id,
        name: j.name,
        description: j.description,
        price: j.price,
        category: j.category,
      });
    });
  }
  onSubmit() {
    const produtoAtualizado: Produto = this.form.value;
    const idNumber = produtoAtualizado.id;

    this.servicoProduto.update(idNumber, produtoAtualizado).subscribe({
      next: () => this.onSucess(),
      error: (e) => this.snackBar.open(e.message || 'Erro', '', { duration: 1000 }),
      complete: () => console.info('complete'),
    });
  }
  onSucess() {
    this.snackBar.open('Registros atualizados com sucesso!', '', { duration: 1000 });
    this.location.back();
  }
  onCancel() {
    this.location.back();
  }
}
