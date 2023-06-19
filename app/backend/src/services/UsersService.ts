import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import UsersModel from '../models/UsersMode';
import createToken, { Token } from '../utils/createToken';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<Token>> {
    const user = await this.usersModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id } = user;
    const token = createToken.sign({ id, email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(email: string): Promise<ServiceResponse< { role: string }>> {
    const user = await this.usersModel.findByEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
