import { BadRequestException } from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";

export function isMongoObjectId({value, key}): Types.ObjectId {
    if (isValidObjectId(value)) {
        return value
    }
    throw new BadRequestException(`El campo ${key} debe ser una referencia válida de la base de datos`)
}