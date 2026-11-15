"use server"

import { sdk } from "@lib/config"
import { removeAuthToken, removeCartId, getCacheTag } from "@lib/data/cookies"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function shopSignout(countryCode: string) {
  await sdk.auth.logout()
  await removeAuthToken()
  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)
  await removeCartId()
  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
  redirect(`/${countryCode}/shop/account`)
}
