"use client";

import { useState, useRef, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MoreHorizontal,
  Plus,
  UtensilsCrossed,
  ImageIcon,
} from "lucide-react";
import { useRestaurant, useMenuItems } from "@/hooks/queries/useRestaurant";
import {
  useCreateMenuItem,
  useUpdateMenuItem,
  useDeleteMenuItem,
  useToggleMenuItemAvailability,
  useUploadMenuItemImage,
} from "@/hooks/mutations/useRestaurantMutations";
import { createMenuItemSchema, CreateMenuItemFormValues } from "@/schemas/menu.schema";
import { MenuItem, CATEGORY } from "@/types/restaurant.types";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";

const CATEGORY_LABELS: Record<CATEGORY, string> = {
  [CATEGORY.APPETIZER]: "Appetizer",
  [CATEGORY.MAIN]: "Main",
  [CATEGORY.DESSERT]: "Dessert",
  [CATEGORY.BEVERAGE]: "Beverage",
};

type DialogMode = "create" | "edit" | null;

export default function AdminMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: restaurantId } = use(params);

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageTargetId, setImageTargetId] = useState<string | null>(null);

  const { data: restaurant, isLoading: isLoadingRestaurant } = useRestaurant(restaurantId);
  const { data: menuItems, isLoading } = useMenuItems(restaurantId);

  const { mutate: createItem, isPending: isCreating } = useCreateMenuItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateMenuItem();
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteMenuItem();
  const { mutate: toggleAvailability, isPending: isToggling } = useToggleMenuItemAvailability();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadMenuItemImage();

  const form = useForm<CreateMenuItemFormValues>({
    resolver: zodResolver(createMenuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: CATEGORY.MAIN,
      preparation_time: 15,
    },
  });

  const openCreate = () => {
    form.reset({ name: "", description: "", price: 0, category: CATEGORY.MAIN, preparation_time: 15 });
    setSelected(null);
    setDialogMode("create");
  };

  const openEdit = (item: MenuItem) => {
    form.reset({
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      category: item.category,
      preparation_time: item.preparation_time,
    });
    setSelected(item);
    setDialogMode("edit");
  };

  const onSubmit = (values: CreateMenuItemFormValues) => {
    if (dialogMode === "create") {
      createItem(
        { restaurantId, data: values },
        { onSuccess: () => setDialogMode(null) },
      );
    } else if (dialogMode === "edit" && selected) {
      updateItem(
        { id: selected.id, data: values, restaurantId },
        { onSuccess: () => setDialogMode(null) },
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !imageTargetId) return;
    uploadImage({ id: imageTargetId, file, restaurantId });
    e.target.value = "";
  };

  const triggerImageUpload = (itemId: string) => {
    setImageTargetId(itemId);
    setTimeout(() => imageInputRef.current?.click(), 50);
  };

  const items = menuItems ?? [];
  const isPending = isCreating || isUpdating;

  return (
    <>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/dashboard/admin/restaurants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            {isLoadingRestaurant ? <Skeleton className="h-6 w-40" /> : restaurant?.data?.name ?? "Menu"}
          </h1>
          <p className="text-sm text-muted-foreground">Menu Management</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription className="mt-1">
                {isLoading ? (
                  <Skeleton className="h-4 w-28" />
                ) : (
                  `${items.length} item${items.length !== 1 ? "s" : ""}`
                )}
              </CardDescription>
            </div>
            <Button size="sm" onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Prep Time</TableHead>
                <TableHead className="hidden lg:table-cell">Availability</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                      <UtensilsCrossed className="h-8 w-8" />
                      <p className="text-sm">No menu items yet. Add your first item.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm leading-tight">{item.name}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="capitalize text-xs">
                        {CATEGORY_LABELS[item.category] ?? item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm font-medium">{formatCurrency(item.price)}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-muted-foreground">{item.preparation_time} min</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={item.is_available ? "default" : "secondary"}>
                        {item.is_available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{formatDate(item.created_at)}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(item)}>
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => triggerImageUpload(item.id)}>
                            <ImageIcon className="mr-2 h-4 w-4" /> Upload Image
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isToggling}
                            onClick={() => toggleAvailability({ id: item.id, restaurantId })}
                          >
                            {item.is_available ? "Mark Unavailable" : "Mark Available"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isDeleting}
                            className="text-destructive focus:text-white"
                            onClick={() => deleteItem({ id: item.id, restaurantId })}
                          >
                            Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Create / Edit Dialog */}
      <Dialog open={dialogMode !== null} onOpenChange={(open) => !open && setDialogMode(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Add Menu Item" : "Edit Menu Item"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="9.99"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(CATEGORY).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {CATEGORY_LABELS[cat]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preparation_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prep Time (min)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="15"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description <span className="text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving…" : dialogMode === "create" ? "Add Item" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
