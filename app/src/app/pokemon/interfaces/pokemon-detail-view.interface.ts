export interface PokemonDetailView {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { name: string }[];
  sprites: { front_default: string };
}
