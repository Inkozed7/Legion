/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { SetMetadata } from '@nestjs/common';
import { RolesEnums } from '../enums/roles.enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnums[]) => SetMetadata(ROLES_KEY, roles);
