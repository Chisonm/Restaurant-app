import { User, UserRole } from '../../core/users/entities/user.entity';

export class UserPolicies {
  static isAdmin(user: User): boolean {
    return user.role === UserRole.ADMIN;
  }

  static isManager(user: User): boolean {
    return user.role === UserRole.MANAGER || user.role === UserRole.ADMIN;
  }

  static canPlaceOrder(user: User): boolean {
    return user.role === UserRole.MANAGER || user.role === UserRole.ADMIN;
  }

  static isResourceOwner(resourceUserId: number) {
    return (user: User): boolean => {
      return user.id === resourceUserId || user.role === UserRole.ADMIN;
    };
  }
}