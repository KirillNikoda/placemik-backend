import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  email!: string;

  @Column({ name: 'first_name' })
  @Field({ nullable: true })
  firstName?: string;

  @Column({ name: 'last_name' })
  @Field({ nullable: true })
  lastName?: string;

  // didn't use @Field decorator cuz we are not gonna query passwords of our users
  @Column()
  password?: string;
}
