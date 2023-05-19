export const returnError = (statusCode: number, errorMessage: string) => {
  const error: any = new Error(errorMessage);
  error.statusCode = statusCode || 400;
  return error;
};
