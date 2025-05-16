import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonListResponse } from '../interfaces';
import { Router, RouterModule } from '@angular/router';

type ListItem = PokemonListResponse & {
  id?: number | null;
  imageUrl: string | null;
}

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: ListItem[] = [];
  offset = 0;
  limit = 20;
  loading = false;
  searchName = '';

  constructor(private readonly pokemonService: PokemonService, private readonly router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.pokemonService.list(this.limit, this.offset).subscribe({
      next: (response) => {
        this.pokemons = this.mapPokemonsToListItem([...this.pokemons, ...response])
        this.offset += this.limit;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Não foi possível carregar pokémons.');
      }
    });
  }

  searchPokemon() {
    const query = this.searchName.trim().toLowerCase();

    if (!query) {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
      return;
    }

    this.loading = true;
    this.pokemonService.getByName(query).subscribe({
      next: (pokemon) => {
        const url = `/pokemon/${pokemon.id}/`;
        this.pokemons = [{ name: pokemon.name, url, id: pokemon.id, imageUrl:  this.getPokemonImageUrl(pokemon.id) }];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Pokémon não encontrado.');
      }
    });
  }

  goToDetails(pokemon: PokemonListResponse) {
    // Extrai o ID do Pokémon da URL
    const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
    if (match) {
      this.router.navigate(['/pokemon', match[1]]);
    }
  }

  private mapPokemonsToListItem(pokemons: PokemonListResponse[]): ListItem[] {
    return pokemons.map(pokemon => {
      const id = this.getPokemonIdFromUrl(pokemon.url);
      return {
        ...pokemon,
        id,
        imageUrl: this.getPokemonImageUrl(id || 0),
      };
    });
  }

  private getPokemonImageUrl(id?: number): string | null {
    if (!id) {
      return null;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  private getPokemonIdFromUrl(url: string): number | null {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1]) : null;
  }
}
