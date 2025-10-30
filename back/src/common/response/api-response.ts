export class ApiResponse<T> {
  error: boolean;
  data: T | null;
  message: string;
  errors: string[];

  constructor(
    error: boolean,
    data: T | null = null,
    message = '',
    errors: string[] = [],
  ) {
    this.error = error;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  static success<T>(data: T, message = 'Operación exitosa'): ApiResponse<T> {
    return new ApiResponse(false, data, message, []);
  }

  static fail(message = 'Ocurrió un error', errors: string[] = []): ApiResponse<null> {
    return new ApiResponse(true, null, message, errors);
  }
}
