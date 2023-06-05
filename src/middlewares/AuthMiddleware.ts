import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
interface IPayLoad{
  sub: string;
}


class AuthMiddleware {
  auth(request: Request, response: Response , next: NextFunction){

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        code: 'token.missing',
        message: 'Token missing',
      });
    }
    
    const [, token] = authHeader.split (' ')
    
    //tratativa
    let secretKey:string | undefined = process.env.ACCESS_KEY_TOKEN
    if (!secretKey) {
      throw new Error('There is no token')
    }


    try {
      const {sub} = verify(token, secretKey) as IPayLoad;
      request.user_id = sub;
      return next()
    } catch (error) {
      return response.status(401).json({
        code: 'token.expired',
        message: 'Token expired',
      });
    }
  }
}

export{
  AuthMiddleware
}