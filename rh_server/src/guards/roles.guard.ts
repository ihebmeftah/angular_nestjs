import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    console.log('User:', user);
    console.log('Required Roles:', requiredRoles);
    const isAuthorized = requiredRoles.includes(user.role);
    if (!isAuthorized) {
      throw new ForbiddenException(`Only ${requiredRoles} are authorized to access this route, current role is ${user.role}`);
    } else {
      return true;
    }
  }
}
