"use client";

import { useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDriverProfile } from "@/hooks/queries/useDriver";
import {
  useUpdateDriverProfile,
  useUpdateDriverPassword,
  useUpdateDriverProfileImage,
} from "@/hooks/mutations/useDriverMutations";
import { useUser } from "@/store/auth.store";
import {
  updateDriverSchema,
  updateDriverPasswordSchema,
  UpdateDriverFormValues,
  UpdateDriverPasswordFormValues,
} from "@/schemas/driver.schema";
import { VEHICLE_TYPE } from "@/types/auth.types";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarUpload } from "@/components/shared/AvatarUpload";
import { getInitials } from "@/lib/utils";

export default function DriverSettingsPage() {
  const user = useUser();
  const { data: profile, isLoading } = useDriverProfile();

  const { mutate: updateProfile, isPending: isSaving } = useUpdateDriverProfile();
  const { mutate: updatePassword, isPending: isChangingPassword } = useUpdateDriverPassword();
  const { mutate: uploadImage, isPending: isUploading } = useUpdateDriverProfileImage();

  const profileForm = useForm<UpdateDriverFormValues>({
    resolver: zodResolver(updateDriverSchema),
    defaultValues: { name: "", email: "", phone: "", vehicle_type: undefined },
  });

  const passwordForm = useForm<UpdateDriverPasswordFormValues>({
    resolver: zodResolver(updateDriverPasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        name: profile.name ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        vehicle_type: profile.vehicle_type as VEHICLE_TYPE,
      });
    }
  }, [profile, profileForm]);

  const onProfileSubmit = (values: UpdateDriverFormValues) => {
    if (!user?.id) return;
    updateProfile({ id: user.id, data: values });
  };

  const onPasswordSubmit = (values: UpdateDriverPasswordFormValues) => {
    if (!user?.id) return;
    updatePassword({ id: user.id, data: values }, { onSuccess: () => passwordForm.reset() });
  };

  const handleImageUpload = (file: File) => {
    if (!user?.id) return;
    uploadImage({ id: user.id, file });
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a photo to personalise your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <AvatarUpload
              currentImageUrl={profile?.profile_img_url}
              initials={getInitials(user?.name)}
              onUpload={handleImageUpload}
              isPending={isUploading}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your name, email, phone, and vehicle type.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-28" />
              </div>
            ) : (
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...profileForm.register("name")} />
                  {profileForm.formState.errors.name && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...profileForm.register("email")} />
                  {profileForm.formState.errors.email && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...profileForm.register("phone")} />
                  {profileForm.formState.errors.phone && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vehicle_type">Vehicle Type</Label>
                  <Select
                    value={profileForm.watch("vehicle_type")}
                    onValueChange={(val) =>
                      profileForm.setValue("vehicle_type", val as VEHICLE_TYPE, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger id="vehicle_type">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={VEHICLE_TYPE.BIKE}>Bike</SelectItem>
                      <SelectItem value={VEHICLE_TYPE.CAR}>Car</SelectItem>
                    </SelectContent>
                  </Select>
                  {profileForm.formState.errors.vehicle_type && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.vehicle_type.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving…" : "Save Changes"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Choose a strong password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" {...passwordForm.register("currentPassword")} />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-xs text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" {...passwordForm.register("newPassword")} />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-xs text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input id="confirmNewPassword" type="password" {...passwordForm.register("confirmNewPassword")} />
                {passwordForm.formState.errors.confirmNewPassword && (
                  <p className="text-xs text-destructive">{passwordForm.formState.errors.confirmNewPassword.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Updating…" : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
