import { type Request, type Response } from 'express';
import { type MapperDto } from '../../application/mapper/MapperDto';
import { type UserProvider, type UserProviderDto } from '../../application/provider/UserProvider';
import { type UserDto } from '../../domain/dto/UserDto';
import { Cache, Cookie } from '../../main/middlewares';
import { ErrorHandler } from '../errors';
import { HttpStatus } from '../http';
import { type UsecaseFactory } from './../../infra/factory/UsecaseFactory';

export class GetUserController {
  constructor(
    private readonly usecaseFactory: UsecaseFactory,
    private readonly userProvider: UserProvider,
    private readonly userMapper: MapperDto<UserDto, UserProviderDto>
  ) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = Cookie.get(req, 'token');
      const userProviderDto = await this.userProvider.getUser(token);
      if (userProviderDto == null) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'bad request' });
      const userDto = this.userMapper.toDto(userProviderDto);
      const user = await this.usecaseFactory.createGetUser().execute(userDto.email);
      if (user.email === undefined) await this.usecaseFactory.createCreateUser().execute(userDto);
      Cache.get(userDto.id, userDto);
      return res.status(HttpStatus.OK).json(userDto);
    } catch (error) {
      const { status, message } = ErrorHandler.catch(error);
      return res.status(status).send({ error: message });
    }
  };
}
