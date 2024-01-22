export const authErrorHandler = (statusCode: number, message: string) => {
    const error: any = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };
  