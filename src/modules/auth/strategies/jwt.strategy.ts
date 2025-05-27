import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Auth, AuthDocument } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(Auth.name)
        private readonly authModel: Model<AuthDocument>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET') || process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<Auth> {

        const { _id } = payload
        const auth = await this.authModel.findOne({_id})

        if(!auth)
            throw new UnauthorizedException('Token no valido')

        if(!auth.isActive)
            throw new UnauthorizedException('Usuario inactivo, comuniquese con el administrador del programa')

        return auth
    }
}