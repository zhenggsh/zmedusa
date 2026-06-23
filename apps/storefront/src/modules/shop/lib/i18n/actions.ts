"use server"

import { cookies as nextCookies } from "next/headers"

const SHOP_LOCALE_COOKIE = "_shop_locale"

export async function setShopLocaleCookie(locale: string) {
  const cookies = await nextCookies()
  cookies.set(SHOP_LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export async function getShopLocale() {
  const cookies = await nextCookies()
  return cookies.get(SHOP_LOCALE_COOKIE)?.value ?? null
}
