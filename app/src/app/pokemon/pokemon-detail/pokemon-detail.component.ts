import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetailView } from '../interfaces/pokemon-detail-view.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-detail',
    standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit {
  pokemon: PokemonDetailView | null = null;
  loading = false;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('pokemonId'));

    if (!id) {
      this.error = 'ID inválido.';
      return;
    }

    this.fetchPokemon(id);
  }

  fetchPokemon(id: number) {
    this.loading = true;
    this.pokemonService.getByName(id.toString()).subscribe({
      next: (data: any) => {
        this.pokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          base_experience: data.base_experience,
          types: data.types.map((t: any) => ({ name: t.type.name })),
          sprites: { front_default: data.sprites.front_default },
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Pokémon não encontrado.';
        this.loading = false;
      }
    });
  }
}
