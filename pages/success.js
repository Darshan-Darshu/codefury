import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { fetcher, shootFireworks } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/outline";

function Success() {
  const {
    query: { session_id },
  } = useRouter();

  const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => `api/checkout_session/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks(), clearCart();
    }
  });
  return <div>SUcess</div>;
}

export default Success;
