import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const { page, limit } = request.query;
        if (page && isNaN(+page)) {
            throw new Error('Page must be a number');
        }
        if (limit && isNaN(+limit)) {
            throw new Error('Limit must be a number');
        }
        return {
            page: page ? +page : 1,
            limit: limit ? +limit : 10,
        };
    },
);