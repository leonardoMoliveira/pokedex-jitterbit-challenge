import { Controller, Get, Param, Query } from "@nestjs/common";
import { FetchPokemonPaginatedListUseCase } from './use_cases/fetch-pokemon-paginated-list.use-case';
import { FetchPokemonDetailsUseCase } from './use_cases/fetch-pokemon-details.use-case';

@Controller('pokemons')
export class PokemonController {
  constructor(
    private readonly fetchPokemonPaginatedListUseCase: FetchPokemonPaginatedListUseCase,
    private readonly fetchPokemonDetailsUseCase: FetchPokemonDetailsUseCase,
  ) {}

  @Get()
  async listPaginatedPokemons(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.fetchPokemonPaginatedListUseCase.execute(limit, offset);
  }
  
  @Get(':pokemonName')
  async showPokemonDetails(@Param('pokemonName') pokemonName: string) {
    return this.fetchPokemonDetailsUseCase.execute({ name: pokemonName });
  }
}
