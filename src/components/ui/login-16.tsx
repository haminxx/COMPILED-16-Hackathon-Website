import { SignInButton } from "@/components/SignInButton";

const googleButtonClass =
  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0040FF] px-4 text-sm font-medium text-white transition hover:bg-[#0036d6] disabled:opacity-60";

export default function Login16() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
      <SignInButton intent="primary" fullWidth className={googleButtonClass} />
    </div>
  );
}
