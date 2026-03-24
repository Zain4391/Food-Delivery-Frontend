"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  UtensilsCrossed,
  ImageIcon,
} from "lucide-react";
import { useRestaurants } from "@/hooks/queries/useRestaurant";
import {
  useCreateRestaurant,
  useUpdateRestaurant,
  useDeleteRestaurant,
  useToggleRestaurantActive,
  useUploadRestaurantLogo,
  useUploadRestaurantBanner,
} from "@/hooks/mutations/useRestaurantMutations";
import {
  createRestaurantSchema,
  CreateRestaurantFormValues,
} from "@/schemas/restaurant.schema";
import { Restaurant, RestaurantListParams } from "@/types/restaurant.types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const PAGE_SIZE = 10;

type DialogMode = "create" | "edit" | "logo" | "banner" | null;

export default function AdminRestaurantsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const params: RestaurantListParams = {
    page,
    limit: PAGE_SIZE,
    sortBy: "created_at",
    sortOrder: "DESC",
    ...(search ? { search } : {}),
  };

  const { data, isLoading, isFetching } = useRestaurants(params);
  const { mutate: createRestaurant, isPending: isCreating } = useCreateRestaurant();
  const { mutate: updateRestaurant, isPending: isUpdating } = useUpdateRestaurant();
  const { mutate: deleteRestaurant, isPending: isDeleting } = useDeleteRestaurant();
  const { mutate: toggleActive, isPending: isToggling } = useToggleRestaurantActive();
  const { mutate: uploadLogo, isPending: isUploadingLogo } = useUploadRestaurantLogo();
  const { mutate: uploadBanner, isPending: isUploadingBanner } = useUploadRestaurantBanner();

  const restaurants = data?.items ?? [];
  const total = data?.meta.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const form = useForm<CreateRestaurantFormValues>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      cusine_type: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const openCreate = () => {
    form.reset({ name: "", description: "", cusine_type: "", address: "", phone: "", email: "" });
    setSelected(null);
    setDialogMode("create");
  };

  const openEdit = (r: Restaurant) => {
    form.reset({
      name: r.name,
      description: r.description ?? "",
      cusine_type: r.cusine_type,
      address: r.address,
      phone: r.phone,
      email: r.email,
    });
    setSelected(r);
    setDialogMode("edit");
  };

  const onSubmit = (values: CreateRestaurantFormValues) => {
    if (dialogMode === "create") {
      createRestaurant(values, { onSuccess: () => setDialogMode(null) });
    } else if (dialogMode === "edit" && selected) {
      updateRestaurant({ id: selected.id, data: values }, { onSuccess: () => setDialogMode(null) });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;
    uploadLogo({ id: selected.id, file }, { onSuccess: () => setDialogMode(null) });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;
    uploadBanner({ id: selected.id, file }, { onSuccess: () => setDialogMode(null) });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const isPending = isCreating || isUpdating;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurants</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Restaurant
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Restaurants</CardTitle>
              <CardDescription className="mt-1">
                {isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  `${total} restaurant${total !== 1 ? "s" : ""}`
                )}
              </CardDescription>
            </div>
            <form
              onSubmit={handleSearch}
              className="flex w-full items-center gap-2 sm:w-auto"
            >
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name…"
                  className="pl-9"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default" size="sm">
                Search
              </Button>
              {search && (
                <Button type="button" variant="ghost" size="sm" onClick={handleClearSearch}>
                  Clear
                </Button>
              )}
            </form>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead className="hidden sm:table-cell">Cuisine</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || isFetching ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-14 rounded-full" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : restaurants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                      <UtensilsCrossed className="h-8 w-8" />
                      <p className="text-sm">
                        {search ? `No restaurants found for "${search}"` : "No restaurants yet."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                restaurants.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm leading-tight">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.address}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground capitalize">{r.cusine_type}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        <div>{r.phone}</div>
                        <div className="text-xs text-muted-foreground">{r.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={r.is_active ? "default" : "secondary"}>
                        {r.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{formatDate(r.created_at)}</span>
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
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/admin/restaurants/${r.id}/menu`}>
                              Manage Menu
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(r)}>
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => { setSelected(r); setDialogMode("logo"); setTimeout(() => logoInputRef.current?.click(), 50); }}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" /> Upload Logo
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => { setSelected(r); setDialogMode("banner"); setTimeout(() => bannerInputRef.current?.click(), 50); }}
                          >
                            <ImageIcon className="mr-2 h-4 w-4" /> Upload Banner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isToggling}
                            onClick={() => toggleActive(r.id)}
                          >
                            {r.is_active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isDeleting}
                            className="text-destructive focus:text-white"
                            onClick={() => deleteRestaurant(r.id)}
                          >
                            Delete Restaurant
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {!isLoading && total > 0 && (
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, total)}–
                {Math.min(page * PAGE_SIZE, total)} of {total}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-2">{page} / {totalPages}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden file inputs for image uploads */}
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoUpload}
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerUpload}
      />

      {/* Create / Edit Dialog */}
      <Dialog open={dialogMode === "create" || dialogMode === "edit"} onOpenChange={(open) => !open && setDialogMode(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogMode === "create" ? "Add Restaurant" : "Edit Restaurant"}</DialogTitle>
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
                        <Input placeholder="Restaurant name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cusine_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Italian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@restaurant.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
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
                  {isPending ? "Saving…" : dialogMode === "create" ? "Create" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
