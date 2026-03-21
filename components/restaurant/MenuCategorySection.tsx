import { MenuItem, CATEGORY } from "@/types/restaurant.types";
import { MenuItemCard } from "./MenuItemCard";

interface Props {
  category: CATEGORY;
  items: MenuItem[];
  restaurantId: string;
}

const CATEGORY_LABEL: Record<CATEGORY, string> = {
  [CATEGORY.APPETIZER]: "Appetizers",
  [CATEGORY.MAIN]: "Main Course",
  [CATEGORY.DESSERT]: "Desserts",
  [CATEGORY.BEVERAGE]: "Beverages",
};

export function MenuCategorySection({ category, items, restaurantId }: Props) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-base mb-1 pb-1 border-b">
        {CATEGORY_LABEL[category]}
      </h3>
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} restaurantId={restaurantId} />
      ))}
    </div>
  );
}
