import { Request, Response, NextFunction } from 'express';

export const checkExtraFields = (allowedFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
     if (!req.body || Object.keys(req.body).length === 0) {
      return next();
    }
    const extraFields = Object.keys(req.body).filter(
      key => !allowedFields.includes(key)
    );

    if (extraFields.length > 0) {
      res.status(400).json({message: `Invalid fields: ${extraFields.join(', ')}`});
      return;
    }
    next();
  };
};