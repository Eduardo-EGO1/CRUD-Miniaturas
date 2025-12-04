import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';
import { Produto } from '../model/produto';

type ProdutoCreate = Omit<Produto, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private API_URL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API_URL).pipe(
      first(),
      tap((p) => console.log(p))
    );
  }

  create(p: ProdutoCreate): Observable<Produto> {
    return this.http.post<Produto>(this.API_URL, p);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  update(id: string, p: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/${id}`, p);
  }

  getOne(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/${id}`);
  }
}
