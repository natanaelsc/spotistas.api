export interface MapperProvider<T, D> {
  toModel: (data: D) => T;
  toModelList: (data: D[]) => T[];
}
