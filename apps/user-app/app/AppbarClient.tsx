"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import zenpay from "./assets/zcharacter.png"
export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/signin")
      }} user={session.data?.user} photo={zenpay} altname={'ZENPAY'} />
   </div>
  );
}
