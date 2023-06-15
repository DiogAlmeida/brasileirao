import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.usersService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
