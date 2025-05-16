import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { PokemonListResponse, PokemonDetails } from './interfaces';
import { PokemonFilters } from './interfaces/pokemon-filters.interface';

describe('PokemonService', () => {
  const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

  let service: PokemonService;
  let httpService: Partial<HttpService>;
  let configService: Partial<ConfigService>;

  beforeEach(async () => {
    httpService = {
      get: jest.fn(),
    } as any;
    configService = {
      get: jest.fn().mockReturnValue(POKEAPI_BASE_URL),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: HttpService, useValue: httpService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();
    service = module.get<PokemonService>(PokemonService);
  });

  describe('list', () => {
    it('should return a list of pokemons', async () => {
      const mockResponse: PokemonListResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      };

      (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockResponse }));

      const result = await service.list(1, 0);

      expect(result).toEqual(mockResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        `${POKEAPI_BASE_URL}/pokemon`,
        { params: { limit: 1, offset: 0 } }
      );
    });
  });

  describe('show', () => {
    it('should return pokemon details by id', async () => {
      const mockDetails: PokemonDetails = { name: 'bulbasaur' } as any;

      (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockDetails }));

      const filters: PokemonFilters = { id: 1 };
      const result = await service.show(filters);

      expect(result).toEqual(mockDetails);
      expect(httpService.get).toHaveBeenCalledWith(`${POKEAPI_BASE_URL}/pokemon/${filters.id}`);
    });

    it('should return pokemon details by name', async () => {
      const mockDetails: PokemonDetails = { name: 'bulbasaur' } as any;

      (httpService.get as jest.Mock).mockReturnValueOnce(of({ data: mockDetails }));

      const filters: PokemonFilters = { name: 'bulbasaur' };
      const result = await service.show(filters);

      expect(result).toEqual(mockDetails);
      expect(httpService.get).toHaveBeenCalledWith(`${POKEAPI_BASE_URL}/pokemon/${filters.name}`);
    });
  });
});
