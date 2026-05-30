export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "tandoor" | "rolls" | "chinese" | "northindian" | "breads" | "continental";
  veg: boolean;
  spicyLevel?: 1 | 2 | 3;
  popular?: boolean;
}

export interface BookingResponse {
  success: boolean;
  simulated: boolean;
  message: string;
  warning?: string;
  messages?: {
    customer: string;
    admin: string;
  };
  error?: string;
}
