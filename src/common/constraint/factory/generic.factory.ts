import { morphism } from "morphism";

export abstract class GenericFactory<TDo, TRequestDto, TResponseDto> {
  protected targetRequestDtoSchema;

  protected targetResponseDtoSchema;

  protected targetDoSchema;

  protected mapper;

  get responseDtoSchema() {
    return this.targetResponseDtoSchema;
  }

  constructor(targetDoSchema, targetRequestDtoSchema, targetResponseDtoSchema) {
    this.targetRequestDtoSchema = targetRequestDtoSchema;
    this.targetResponseDtoSchema = targetResponseDtoSchema;
    this.targetDoSchema = targetDoSchema;
    this.mapper = morphism;
  }

  toRequestDto(source: TDo | TDo[]): TRequestDto {
    return this.mapper(this.targetRequestDtoSchema, source);
  }

  toResponseDto(source: TDo | TDo[]): TResponseDto {
    return this.mapper(this.targetResponseDtoSchema, source);
  }

  toDo(source: TRequestDto | TResponseDto | TRequestDto[] | TResponseDto[]): TDo {
    return this.mapper(this.targetDoSchema, source);
  }
}
