import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '@modules/users/users.module';
import { AuthenticationModule } from '@modules/auth/auth.module';
import { getTypeOrmConfig } from '@modules/core/database/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...getTypeOrmConfig(),
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
