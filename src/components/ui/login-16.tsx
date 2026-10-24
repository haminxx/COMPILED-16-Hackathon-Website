import { SignInButton } from "@/components/SignInButton";

const googleButtonClass =
  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 disabled:opacity-60";

export default function Login16() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
      <SignInButton intent="primary" fullWidth className={googleButtonClass} />
    </div>
  );
}
