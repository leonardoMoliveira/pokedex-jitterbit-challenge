import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse, PokemonDetails } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly URL = '/pokemons';

  constructor(private readonly http: HttpClient) {}

  list(limit: number = 20, offset: number = 0): Observable<PokemonListResponse[]> {
    return this.http.get<PokemonListResponse[]>(this.URL, { params: { limit, offset } });
  }

  getByName(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.URL}/${name}`);
  }
}
