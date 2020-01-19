export interface MetadataBuilder<T> {
  build(...args: any[]): T;
}
