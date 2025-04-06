export interface RequestParamsDto<T> {
    page: number,
    size?: number,
    filters?: T
}