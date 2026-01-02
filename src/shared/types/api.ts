interface APISuccessResponse {
  ok: true;
  data: object;
  message?: undefined;
}

interface APIErrorResponse {
  ok: false;
  data?: undefined;
  message: string;
}

export type APIResponse = APISuccessResponse | APIErrorResponse;
