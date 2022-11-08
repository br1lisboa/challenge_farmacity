export interface Event {
    id: number;
    name: string;
    creator: boolean;
    movies: MovieSelected[];
    date: string;
}

export interface MovieSelected {
    movieId: string;
    img: string;
    description: string;
    votedBy: number[];
}