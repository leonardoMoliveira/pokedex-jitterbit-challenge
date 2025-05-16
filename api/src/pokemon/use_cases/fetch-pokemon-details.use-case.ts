import { Injectable, Logger } from '@nestjs/common';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { PokemonNotFoundException } from '../exceptions/pokemon-not-found.exception';
import { AxiosError } from 'axios';
import { PokemonFilters } from '../interfaces/pokemon-filters.interface';

@Injectable()
export class FetchPokemonDetailsUseCase {
  private readonly logger = new Logger(FetchPokemonDetailsUseCase.name);

  constructor(private readonly pokemonService: PokemonService) {}

  async execute(filters: PokemonFilters): Promise<PokemonDetails> {
    try {
      const details = await this.pokemonService.show(filters);
      return details;
    } catch (error: unknown) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 404
      ) {
        this.logger.warn('Pokémon not found', error.message);
        throw new PokemonNotFoundException();
      }
      throw error;
    }
  }
}
