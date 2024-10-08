import type { NextFunction, Request, Response } from "express";

import { HttpStatus } from "../../data/constants/http-status";
import type { GenericFactory } from "../constraint/factory/generic.factory";
import type { GenericSA } from "../service/generic.sa";
import type { GenericSM } from "../service/generic.sm";

export abstract class GenericController<
  TDO,
  TRequestDTO,
  TResponseDTO,
  TSA extends GenericSA<TDO, TRequestDTO, TResponseDTO, GenericSM<TDO>, GenericFactory<TDO, TRequestDTO, TResponseDTO>>,
> {
  protected sa: TSA;

  constructor(sa: TSA) {
    this.sa = sa;
  }

  /**
   * WS gérant la création d'une entité
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
      const created = await this.sa.create(body);

      res.locals.data = created;
      res.locals.statusCode = HttpStatus.CREATED;

      next();
    } catch (error) {
      next(error);
    }
  };

  partialUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const {
      body,
      params: { id },
    } = req;
    try {
      const updated = await this.sa.partialUpdate(id, body);

      res.locals.data = updated;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la suppression d'une entité
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    try {
      const response = await this.sa.delete(id);

      res.locals.data = response;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS gérant la récupération d'une entité par son id
   */
  findById = async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    try {
      const found = await this.sa.findById(id);

      res.locals.data = found;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant la liste de toutes les entités
   */
  findMany = async (req: any, res: Response, next: NextFunction) => {
    const {
      query: { page = 1, size = 10, sort = "createdAt", direction = "asc", light, ...queries },
    } = req;
    try {
      const dtos = await this.sa.findMany({
        queries,
        limit: size,
        skip: (page - 1) * size,
        sort: { [sort]: direction },
        light: JSON.parse(light || "true"),
      });
      res.locals.data = dtos;
      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant toutes les entités sans pagination
   */

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtos = await this.sa.findAll();
      res.locals.data = dtos;
      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * WS retournant le document répondant aux critères spécifiés
   */
  findOne = async (req: Request, res: Response, next: NextFunction) => {
    const {
      query: { page, rowPerPage, light, direction, sortField, match, recherche, ...queries },
    } = req;
    try {
      const found = await this.sa.findOne({
        search: recherche,
        match,
        queries,
      });

      if (Array.isArray(found) && found.length > 0) {
        res.locals.data = found.shift();
      } else {
        res.locals.data = false;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
