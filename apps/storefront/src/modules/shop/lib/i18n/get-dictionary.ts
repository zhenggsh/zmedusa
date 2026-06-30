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
    shop_now: string
    browse_all: string
    search: string
    search_results: string
    search_prompt: string
    browse_all_products: string
    results_for: string
    no_products_found: string
    tagline: string
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
    company: string
    address: string
    address_2_placeholder: string
    city: string
    postal_code: string
    province: string
    country: string
    select: string
    default_shipping_address: string
  }
  product: {
    add_to_cart: string
    select_all_options: string
    combination_not_available: string
    added_to_cart: string
    add_to_cart_failed: string
    out_of_stock: string
  }
  cart: {
    title: string
    item_added: string
    empty: string
    continue_shopping: string
    proceed_to_checkout: string
    quantity: string
    remove: string
    subtotal: string
    shipping: string
    total: string
    order_summary: string
  }
  checkout: {
    title: string
    address: string
    shipping: string
    payment: string
    review: string
    progress_separator: string
    place_order: string
    order_summary: string
  }
  order: {
    confirmed: string
    thank_you: string
    order_number: string
    continue_shopping: string
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
