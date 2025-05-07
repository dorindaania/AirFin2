"use client"
import { SignIn, SignUp, useClerk } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useClerk();

  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get("redirect_url") || "/dashboard";
      router.push(redirectUrl);
    }
  }, [user, router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      {isSignUp ? <SignUp /> : <SignIn />}
    </div>
  );
}
