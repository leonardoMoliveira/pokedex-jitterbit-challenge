import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PokemonListResponse, PokemonDetails } from './interfaces';
import { PokemonFilters } from './interfaces/pokemon-filters.interface';

@Injectable()
export class PokemonService {
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('POKEAPI_BASE_URL')!;
  }

  async list(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
    const url = `${this.baseUrl}/pokemon`;
    const response = await firstValueFrom(this.httpService.get<PokemonListResponse>(url, { params: { limit, offset } }));
    return response.data;
  }

  async show(filters: PokemonFilters): Promise<PokemonDetails> {
    const url = `${this.baseUrl}/pokemon/${filters.id ?? filters.name}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
