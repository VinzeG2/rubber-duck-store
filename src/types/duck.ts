export type Duck = {
    id: number;
    color: string;
    size: string;
    price: number;
    stock: number;
  }
  
export type NewDuck = Omit<Duck, "id">;
  