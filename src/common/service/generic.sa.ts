import type { FilterQuery } from "mongoose";
import type { GenericFactory } from "../constraint/factory/generic.factory";
import type { GenericSM } from "./generic.sm";
import type { QueryFilter, FilteredQueryFilter } from "./type";

export abstract class GenericSA<
  TDO extends object,
  TRequestDTO extends object,
  TResponseDTO,
  TSM extends GenericSM<TDO>,
  TFactory extends GenericFactory<TDO, TRequestDTO, TResponseDTO>,
> {
  protected sm: TSM;

  protected factory: TFactory;

  constructor(sm: TSM, factory: TFactory) {
    this.sm = sm;
    this.factory = factory;
  }

  async create(dto: TRequestDTO): Promise<TResponseDTO> {
    try {
      const entity = this.factory.toDO(dto);
      const result = await this.sm.create(entity);

      return this.factory.toResponseDTO(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async partialUpdate(id: string, dto: TRequestDTO) {
    try {
      const partialEntity = this.factory.toDO(dto);
      await this.sm.partialUpdate(id, partialEntity);

      return id;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string) {
    try {
      await this.sm.delete(id);

      return id;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: string) {
    try {
      const result = await this.sm.findById(id);

      return this.factory.toResponseDTO(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(query: FilterQuery<TDO>) {
    try {
      const result = await this.sm.findOne(query);

      return this.factory.toResponseDTO(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll() {
    try {
      const entities: any = await this.sm.findAll();
      return this.factory.toResponseDTO(entities);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findMany(filter: QueryFilter<TDO>) {
    try {
      const entities = await this.sm.findMany(filter);
      const total = await this.sm.count(filter.queries);
      return {
        total,
        page: filter.skip,
        size: filter.limit,
        items: this.factory.toResponseDTO(entities),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async filteredFindMany(filter: FilteredQueryFilter<TDO>) {
    try {
      const entities = await this.sm.filteredFindMany(filter);
      const total = await this.sm.count(filter.queries);
      return {
        total,
        page: filter.skip,
        size: filter.limit,
        items: this.factory.toResponseDTO(entities),
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
