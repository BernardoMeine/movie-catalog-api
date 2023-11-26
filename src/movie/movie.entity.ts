import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseYear: Date;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  rating: number;
}
