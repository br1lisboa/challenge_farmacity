export class Movie {
  constructor(input?: any) {
    Object.assign(this, input)
  }

  id: string;
  name: string;
  img: string;
  trailer: string;
  synopsis: string;
  directedBy: string;
  duration: string;
  release: string;
}