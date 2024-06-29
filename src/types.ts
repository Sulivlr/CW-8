export interface Quote {
  id: string;
  author: string;
  category: string;
  text: string;
}

export type ApiQuote = Omit<Quote, "id">;

export interface ApiQuotes {
  [id: string] : ApiQuote
}