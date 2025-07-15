export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  private errors: string[] = [];

  static create(): Validator {
    return new Validator();
  }

  required(value: any, fieldName: string): this {
    if (value === null || value === undefined || value === '') {
      this.errors.push(`${fieldName} est requis`);
    }
    return this;
  }

  minLength(value: string, min: number, fieldName: string): this {
    if (typeof value === 'string' && value.length < min) {
      this.errors.push(`${fieldName} doit contenir au moins ${min} caractères`);
    }
    return this;
  }

  maxLength(value: string, max: number, fieldName: string): this {
    if (typeof value === 'string' && value.length > max) {
      this.errors.push(`${fieldName} ne peut pas dépasser ${max} caractères`);
    }
    return this;
  }

  email(value: string, fieldName: string = 'Email'): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value === 'string' && value && !emailRegex.test(value)) {
      this.errors.push(`${fieldName} n'est pas valide`);
    }
    return this;
  }

  url(value: string, fieldName: string = 'URL'): this {
    try {
      if (value) {
        new URL(value);
      }
    } catch {
      this.errors.push(`${fieldName} n'est pas une URL valide`);
    }
    return this;
  }

  numeric(value: any, fieldName: string): this {
    if (value !== null && value !== undefined && isNaN(Number(value))) {
      this.errors.push(`${fieldName} doit être un nombre`);
    }
    return this;
  }

  min(value: number, min: number, fieldName: string): this {
    if (typeof value === 'number' && value < min) {
      this.errors.push(`${fieldName} doit être supérieur ou égal à ${min}`);
    }
    return this;
  }

  max(value: number, max: number, fieldName: string): this {
    if (typeof value === 'number' && value > max) {
      this.errors.push(`${fieldName} doit être inférieur ou égal à ${max}`);
    }
    return this;
  }

  pattern(value: string, pattern: RegExp, fieldName: string, message?: string): this {
    if (typeof value === 'string' && value && !pattern.test(value)) {
      this.errors.push(message || `${fieldName} n'est pas au bon format`);
    }
    return this;
  }

  custom(condition: boolean, message: string): this {
    if (!condition) {
      this.errors.push(message);
    }
    return this;
  }

  getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors],
    };
  }

  reset(): this {
    this.errors = [];
    return this;
  }
}

// Specific validators for the spiritual app
export const validateJournalEntry = (title: string, content: string): ValidationResult => {
  return Validator.create()
    .required(title, 'Titre')
    .minLength(title, 3, 'Titre')
    .maxLength(title, 100, 'Titre')
    .required(content, 'Contenu')
    .minLength(content, 10, 'Contenu')
    .maxLength(content, 2000, 'Contenu')
    .getResult();
};

export const validateUserProfile = (name: string, bio?: string): ValidationResult => {
  const validator = Validator.create()
    .required(name, 'Nom')
    .minLength(name, 2, 'Nom')
    .maxLength(name, 50, 'Nom');

  if (bio) {
    validator.maxLength(bio, 200, 'Bio');
  }

  return validator.getResult();
};

export const validateReadingPlan = (
  title: string,
  description: string,
  duration: number
): ValidationResult => {
  return Validator.create()
    .required(title, 'Titre du plan')
    .minLength(title, 5, 'Titre du plan')
    .maxLength(title, 100, 'Titre du plan')
    .required(description, 'Description')
    .minLength(description, 20, 'Description')
    .maxLength(description, 500, 'Description')
    .required(duration, 'Durée')
    .numeric(duration, 'Durée')
    .min(duration, 1, 'Durée')
    .max(duration, 365, 'Durée')
    .getResult();
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\s+/g, ' '); // Normalize whitespace
};

export const validateAndSanitize = (
  input: string,
  validator: (value: string) => ValidationResult
): { value: string; validation: ValidationResult } => {
  const sanitized = sanitizeInput(input);
  const validation = validator(sanitized);
  
  return {
    value: sanitized,
    validation,
  };
};