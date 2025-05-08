export type Duck = {
    _id: string;
    id: number;
    color: string;
    size: string;
    price: number;
    stock: number;
    deleted: boolean;
  }
  
export type NewDuck = Omit<Duck, "_id" | "id" | "deleted">;
  