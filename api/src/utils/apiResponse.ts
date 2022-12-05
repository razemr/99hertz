export interface Response {
  status: number;
  message: string;
  errors: any;
  data: any;
}

export class ApiResponse {
  static error = (
    message: string = 'Error',
    errors: any = [],
  ): Response => ({
    status: 0,
    data: '',
    message,
    errors,
  });

  static success = (data: any = '', message: string = 'Success'): Response => ({
    status: 1,
    errors: [],
    data,
    message,
  });
}
