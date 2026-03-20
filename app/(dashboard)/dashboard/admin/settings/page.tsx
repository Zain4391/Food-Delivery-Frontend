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
import { useAdminProfile } from "@/hooks/queries/useAdmin";
import {
  useUpdateAdminProfile,
  useUpdateAdminPassword,
  useUploadAdminProfileImage,
} from "@/hooks/mutations/useAdminMutations";
import { useUser } from "@/store/auth.store";
import {
  updateCustomerSchema,
  updatePasswordSchema,
  UpdateCustomerFormValues,
  UpdatePasswordFormValues,
} from "@/schemas/customer.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarUpload } from "@/components/shared/AvatarUpload";
import { getInitials } from "@/lib/utils";

export default function AdminSettingsPage() {
  const user = useUser();
  const { data: profile, isLoading } = useAdminProfile();

  const { mutate: updateProfile, isPending: isSaving } = useUpdateAdminProfile();
  const { mutate: updatePassword, isPending: isChangingPassword } = useUpdateAdminPassword();
  const { mutate: uploadImage, isPending: isUploading } = useUploadAdminProfileImage();

  const profileForm = useForm<UpdateCustomerFormValues>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", address: "" },
  });

  const passwordForm = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        name: profile.name ?? "",
        email: profile.email ?? "",
        address: profile.address ?? "",
      });
    }
  }, [profile, profileForm]);

  const onProfileSubmit = (values: UpdateCustomerFormValues) => {
    if (!user?.id) return;
    updateProfile({ id: user.id, data: values });
  };

  const onPasswordSubmit = (values: UpdatePasswordFormValues) => {
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
            <CardDescription>Update your name, email, and address.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
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
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...profileForm.register("address")} />
                  {profileForm.formState.errors.address && (
                    <p className="text-xs text-destructive">{profileForm.formState.errors.address.message}</p>
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
