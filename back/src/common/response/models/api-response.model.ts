import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export class ApiBaseResponse<T> {
  @ApiProperty({ example: false })
  error: boolean;

  @ApiProperty({ example: 'Operación realizada correctamente' })
  message: string;

  @ApiProperty({ example: [] })
  errors: string[];

  @ApiProperty()
  data: T;
}

/**
 * Función que genera un modelo de respuesta con la clase de datos esperada.
 * Esto permite documentar correctamente en Swagger el tipo del campo "data".
 */
export const ApiResponseModel = <TModel extends Type<any>>(model: TModel) => {
  class ApiResponseWithModel extends ApiBaseResponse<TModel> {
    @ApiProperty({ type: model })
    declare data: TModel;
  }

  Object.defineProperty(ApiResponseWithModel, 'name', {
    value: `ApiResponse${model.name}`,
  });

  return ApiResponseWithModel;
};
