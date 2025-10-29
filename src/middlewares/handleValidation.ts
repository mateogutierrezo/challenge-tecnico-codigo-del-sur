import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// maneja los errores devueltos por el validator.
export const handleValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
}