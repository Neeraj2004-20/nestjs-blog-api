import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  async create(email: string, username: string, password: string) {
    const user = { id: Date.now(), email, username, password, role: 'user' };
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  async findOne(id: string) {
    return this.users.find(u => u.id === id);
  }
}
