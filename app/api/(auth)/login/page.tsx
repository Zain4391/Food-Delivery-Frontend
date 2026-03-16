import { AuthHeroPanel } from "@/components/auth/AuthHeroPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserType } from "@/types/auth.types";
import { ROLE_CONFIG } from "@/types/map";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") as UserType | null;
  const [activeTab, setActiveTab] = useState<UserType>(
    registered ?? "customer",
  );

  return (
    <>
      <AuthHeroPanel
        image="/images/login.jpg"
        imageAlt="Delicious food spread ready to be delivered"
        headline="Good food is just a tap away."
        subtext="Sign in to order your favourites, track deliveries, and manage your account."
      />

      <div className="w-full lg:w-1/2 h-full flex flex-col bg-white dark:bg-background overflow-y-auto scrollbar-hide">
        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-10">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-base">
                Sign in to your account to continue.
              </p>
            </div>

            {registered && (
              <Alert className="border-primary/30 bg-primary/5 text-primary">
                <AlertDescription className="font-medium">
                  Account created! Please sign in to continue.
                </AlertDescription>
              </Alert>
            )}

            {/* Role tabs + forms */}
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as UserType)}
            >
              <TabsList className="w-full h-12 rounded-xl bg-muted p-1 mb-2">
                {(Object.keys(ROLE_CONFIG) as UserType[]).map((role) => (
                  <TabsTrigger
                    key={role}
                    value={role}
                    className="flex-1 rounded-lg text-sm font-bold tracking-wide
                      data-[state=active]:bg-primary
                      data-[state=active]:text-white
                      data-[state=active]:shadow-sm
                      transition-all duration-200"
                  >
                    {ROLE_CONFIG[role].label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {(Object.keys(ROLE_CONFIG) as UserType[]).map((role) => (
                <TabsContent key={role} value={role} className="mt-4">
                  <LoginForm userType={role} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
