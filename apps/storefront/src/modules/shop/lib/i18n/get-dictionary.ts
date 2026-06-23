import "server-only"
import { Locale } from "./config"

export interface Dictionary {
  header: {
    search_placeholder: string
    login: string
    account: string
    logo: string
  }
  footer: {
    company_info: string
    support: string
    legal: string
    business: string
    about_us: string
    contact: string
    careers: string
    help_center: string
    faq: string
    shipping: string
    terms: string
    privacy: string
    refund: string
    partners: string
    affiliate: string
    wholesale: string
    copyright: string
  }
  common: {
    loading: string
    error: string
    new_arrivals: string
    top_selling: string
  }
  auth: {
    welcome_back: string
    sign_in_prompt: string
    email: string
    password: string
    sign_in: string
    no_account: string
    create_account: string
    register_title: string
    register_prompt: string
    first_name: string
    last_name: string
    phone: string
    already_have_account: string
    sign_in_here: string
    sign_out: string
    error_invalid_credentials: string
    error_generic: string
  }
  account: {
    overview: string
    profile: string
    addresses: string
    orders: string
    welcome: string
    recent_orders: string
    no_orders: string
    edit_profile: string
    save_changes: string
    cancel: string
    add_address: string
    edit_address: string
    delete_address: string
    default: string
    no_addresses: string
    order_number: string
    order_date: string
    order_total: string
    order_status: string
    view_details: string
  }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
  th: () => import("./dictionaries/th.json").then((m) => m.default as Dictionary),
  id: () => import("./dictionaries/id.json").then((m) => m.default as Dictionary),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const validLocale = dictionaries[locale as Locale] ? (locale as Locale) : "en"
  return dictionaries[validLocale]()
}
