export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }

  getId = (): string => this.id;

  getName = (): string => this.name;

  getEmail = (): string => this.email;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}
