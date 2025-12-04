import { Routes } from '@angular/router';
import { ListaProdutos } from './components/produtos/lista-produtos/lista-produtos';
import { Component } from '@angular/core';
import { FormProdutos } from './components/form-produtos/form-produtos';
import { FormEditProduto } from './components/form-edit/form-edit';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () =>
      import('./components/produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
  },
  { path: 'produtos/new', component: FormProdutos },
  {
    path: 'produtos/edit',
    component: FormEditProduto,
  },
];
