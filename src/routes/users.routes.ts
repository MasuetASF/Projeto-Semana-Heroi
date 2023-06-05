import {Router, response} from 'express'
import { UsersControllers } from '../controllers/UsersControllers';
import { upload } from '../config/multer';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

class UsersRoutes{
  private router: Router;
  private usersControllers: UsersControllers;
  private authMiddleware: AuthMiddleware;
  constructor(){
    this.router = Router();
    this.usersControllers = new UsersControllers();
    this.authMiddleware = new AuthMiddleware();
  }
  getRoutes(): Router {
     
    this.router.post(
      '/', 
      this.usersControllers.store.bind(this.usersControllers),
    );
    this.router.put(
      '/', 
      upload.single('avatar_url'),
      this.authMiddleware.auth.bind(this.authMiddleware),
      this.usersControllers.update.bind(this.usersControllers),
      );

    this.router.post(
      '/auth', 
      this.usersControllers.auth.bind(this.usersControllers
    ));
    
    return this.router  
  }
}

export {UsersRoutes}