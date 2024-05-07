import React, { useCallback } from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useMutation } from "@connectrpc/connect-query";
import { signIn } from "../gen/ssoready/v1/ssoready-SSOReadyService_connectquery";
import { setSessionToken } from "../auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export function LoginPage() {
  const signInMutation = useMutation(signIn);

  const navigate = useNavigate();
  const handleGoogle = useCallback(
    async (credentialResponse: CredentialResponse) => {
      const { sessionToken } = await signInMutation.mutateAsync({
        googleCredential: credentialResponse.credential,
      });
      setSessionToken(sessionToken);
      navigate("/");
    },
    [signInMutation, navigate],
  );

  return (
    <GoogleOAuthProvider
      clientId={
        "171906208332-m8dg2p6av2f0aa7lliaj6oo0grct57p1.apps.googleusercontent.com"
      }
    >
      <div className="bg-white container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/logo.svg" alt="SSOReady Logo" width="24" height="24" />
            <span className="ml-2">SSOReady</span>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to SSOReady
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in
              </p>
            </div>

            <div className="grid gap-6">
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                    />
                  </div>
                  <Button>Sign In with Email</Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin text="continue_with" onSuccess={handleGoogle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
