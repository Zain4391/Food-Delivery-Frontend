export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-right">
            Welcome to the Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            This is where metric charts will go
          </p>
        </div>
      </div>
    </>
  );
}
