import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonController } from './pokemon/pokemon.controller';
import { PokemonService } from './pokemon/pokemon.service';
import { FetchPokemonPaginatedListUseCase } from './pokemon/use_cases/fetch-pokemon-paginated-list.use-case';
import { FetchPokemonDetailsUseCase } from './pokemon/use_cases/fetch-pokemon-details.use-case';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PokemonController],
  providers: [PokemonService, FetchPokemonPaginatedListUseCase, FetchPokemonDetailsUseCase],
})
export class PokedexApiModule {}
