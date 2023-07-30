export default class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create = (id: string, name: string, email: string): User => new User(id, name, email);

  getId = (): string => this.id;

  getName = (): string => this.name;

  getEmail = (): string => this.email;
}
