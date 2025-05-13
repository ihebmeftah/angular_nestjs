export function getPaginationParams(p?: number, l?: number): {
    skip: number;
    take: number;
    page: number;
    limit: number;
} {
    const page = p ? +p : 1;
    const limit = l ? +l : 10;
    const skip = (page - 1) * limit;
    return { skip, take: limit, page, limit };
}

export function buildPaginatedResponse<T>(
    data: T[],
    total: number,
    page: number,
    limit: number
): PaginatedResponseDto<T> {
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        page,
        limit,
        totalItems: total,
        totalPages,
        hasNext: page < totalPages,
    };
}
export class PaginatedResponseDto<T> {
    data: T[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
}