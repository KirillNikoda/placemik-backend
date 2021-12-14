import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  public id!: number;

  @Column({ unique: true })
  @Field()
  public email!: string;

  @Column({ name: 'first_name', nullable: true })
  @Field({ nullable: true })
  public firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  @Field({ nullable: true })
  public lastName?: string;

  // didn't use @Field decorator cuz we are not gonna query passwords of our users
  @Column()
  public password!: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
