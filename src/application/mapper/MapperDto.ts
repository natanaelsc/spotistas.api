export interface MapperDto<T, D> {
  toDto: (data: D) => T;
  toDtoList: (data: D[]) => T[];
}
