interface APISuccessResponse<TData> {
  ok: true;
  data: TData;
  message?: undefined;
}

interface APIErrorResponse {
  ok: false;
  data?: undefined;
  message: string;
}

export type APIResponse<TData = object> = APISuccessResponse<TData> | APIErrorResponse;
