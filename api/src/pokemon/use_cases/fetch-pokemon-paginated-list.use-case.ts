import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PokemonService } from '../pokemon.service';
import { SimplePokemonDto } from '../dto/simple-pokemon.dto';

@Injectable()
export class FetchPokemonPaginatedListUseCase {
  private readonly logger = new Logger(FetchPokemonPaginatedListUseCase.name);
  
  constructor(private readonly pokemonService: PokemonService) {}

  async execute(limit: number = 20, offset: number = 0): Promise<SimplePokemonDto[]> {
    try {
      const data = await this.pokemonService.list(limit, offset);

      return data.results.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url,
      }));
    } catch (error: any) {
      this.logger.error('Error fetching pokemons', error?.stack || error?.message || error?.toString());

      throw new InternalServerErrorException('Failed to fetch pokemons', error?.message || error?.toString());
    }
  }
}