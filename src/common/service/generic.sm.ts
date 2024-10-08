import { type Model, model, type FilterQuery } from "mongoose";
import type { QueryFilter, FilteredQueryFilter } from "./type";

export abstract class GenericSM<TDO> {
  protected model: Model<TDO>;

  protected relations: (keyof TDO)[];

  constructor(modelName: string, relations: (keyof TDO)[] = []) {
    this.model = model(modelName);
    this.relations = relations;
  }

  create = (entity: TDO) => this.model.create(entity);

  createMany = (entities: TDO[]) => this.model.insertMany(entities);

  partialUpdate = (id: string, partialEntity: Partial<TDO>) => this.model.updateOne({ _id: id }, partialEntity);

  delete = (id: string) => this.model.deleteOne({ _id: id });

  findById = (id: string) => this.populate(this.model.findById(id));

  findOne = (query: FilterQuery<TDO>) => this.populate(this.model.findOne(query));

  isExist = (query: FilterQuery<TDO>) => this.model.exists(query);

  findMany = (filter: QueryFilter<TDO>) =>
    this.populate(this.model.find(filter.queries).skip(filter.skip).limit(filter.limit).sort(filter.sort));

  filteredFindMany = (filter: FilteredQueryFilter<TDO>) =>
    this.populate(
      this.model.find(filter.queries).select(filter.filtered).skip(filter.skip).limit(filter.limit).sort(filter.sort),
    );

  count = (query: FilterQuery<TDO> = {}) => this.model.countDocuments(query);

  findAll = () => this.populate(this.model.find());

  private populate(request) {
    this.relations.forEach((relation) => {
      request.populate(String(relation));
    });
    return request;
  }
}
