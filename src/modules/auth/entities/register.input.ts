import { ObjectType } from '@nestjs/graphql';
import { LoginInput } from './login.input';

@ObjectType()
export class RegisterInput extends LoginInput {}
