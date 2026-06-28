import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToClass(dtoClass, req.body);
      const errors = await validate(dtoObject);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error: ValidationError) => ({
            field: error.property,
            message: Object.values(error.constraints || {}).join(', '),
          }))
          .reduce((acc: any, curr: any) => {
            acc[curr.field] = curr.message;
            return acc;
          }, {});

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages,
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Validation error occurred',
      });
    }
  };
};

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body);

      if (error) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map((detail: any) => ({
            field: detail.path.join('.'),
            message: detail.message,
          })),
        });
        return;
      }

      req.body = value;
      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Validation error occurred',
      });
    }
  };
};
