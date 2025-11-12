"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function GoTo() {

  const router = useRouter();
  const gotoDash = async () => {
    router.push("/protected");
    
  };
  return  <Button onClick={gotoDash}>Dashboard</Button>;;
}
