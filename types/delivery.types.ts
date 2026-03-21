export interface Delivery {
  id: string;
  order_id: string;
  picked_up_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}
