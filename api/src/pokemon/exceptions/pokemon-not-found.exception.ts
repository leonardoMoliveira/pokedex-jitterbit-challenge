import { HttpException, HttpStatus } from '@nestjs/common';

export class PokemonNotFoundException extends HttpException {
  constructor(param?: number | string, message: string = 'Pokémon not found') {
    super(`${message}: ${param}`, HttpStatus.NOT_FOUND);
  }
}
