import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ROLE } from '../../../../shared-database/src/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        if (!user || user !== ROLE.ADMIN) {
            throw new HttpException(
                `Your current role: ${user.role} does not have permission to use this API.`,
                HttpStatus.FORBIDDEN,
            );
        }

        return true;
    }
}