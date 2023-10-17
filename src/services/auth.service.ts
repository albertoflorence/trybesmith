import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import * as Service from '../types/Service';
import tokenUtil from '../utils/tokenUtil';

async function login(username: string, password: string): Service.Return {
  if (!username || !password) {
    return {
      code: 'BAD_REQUEST',
      data: { message: '"username" and "password" are required' },
    };
  }

  const user = await UserModel.findOne({ where: { username } });
  const isPasswordValid = user && bcrypt.compareSync(password, user.dataValues.password);
  if (!isPasswordValid) {
    return { code: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const token = tokenUtil.generate({
    id: user.dataValues.id,
    username: user.dataValues.username,
  });

  return { code: 'OK', data: { token } };
}

export default { login };
