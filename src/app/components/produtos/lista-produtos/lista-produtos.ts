import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';
import { Produto } from '../../../model/produto';
import { ProdutosService } from '../../../service/produtos-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos$: Observable<Produto[]>;
  displayedColumns = ['id', 'nome', 'descricao', 'preco', 'categoria', 'acao'];
  dataSource = new MatTableDataSource<Produto>([]);

  constructor(
    private produtosService: ProdutosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.produtos$ = produtosService.list();
    console.log(produtosService.list());
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.produtosService.list().subscribe({
      next: (dados) => {
        this.dataSource.data = dados;
      },
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
  onDelete(id: string) {
    this.produtosService.delete(id).subscribe({
      next: () => this.onSucess(),
      error: (err) => console.error('Erro ao deletar', err),
      complete: () => (this.produtos$ = this.produtosService.list()),
    });
  }
  onEdit(produto_id: string) {
    this.router.navigate(['/produtos/edit'], { queryParams: { id: produto_id } });
  }
  onSucess() {
    this.snackBar.open('Produto deletado com sucesso!', '', { duration: 1000 });
  }
}
