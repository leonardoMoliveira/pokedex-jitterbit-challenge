import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pokemon/pokemon-list/pokemon-list.component').then(m => m.PokemonListComponent),
  },
  {
    path: 'pokemon/:pokemonId',
    loadComponent: () => import('./pokemon/pokemon-detail/pokemon-detail.component').then(m => m.PokemonDetailComponent),
  },
];
