import { Injectable } from '@nestjs/common';
import { ApiResponse, ApiResponseType } from './constants/ApiResponse';

@Injectable()
export class AppService {
  getServerHealth(): ApiResponseType {
    const response = new ApiResponse(
      'Server running | ' + new Date().toISOString(),
      null,
      200,
    );
    return response.getResponse();
  }
}
