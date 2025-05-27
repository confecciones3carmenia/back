import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const handleException = (error: any, context: string, type: string) => {
  if (error.code === 11000) {
    const message = `El ${type} ${JSON.stringify(error.keyValue)} ya existe en DB`;
    Logger.error(`${message} - ${context}`);
    throw new BadRequestException(message);
  }
  const message = `No se puede crear el ${type} - ${error} - Validar logs del server`;
  Logger.error(`${message} - ${error} - ${context}`);
  throw new InternalServerErrorException(message);
};
