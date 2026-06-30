import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ImageGallery } from "@modules/shop/components/image-gallery"
import { ProductPrice } from "@modules/shop/components/product-price"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import { ProductActions } from "@modules/shop/components/product-actions"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"

interface Props {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { countryCode, handle } = params

  const { response } = await listProducts({
    countryCode,
    queryParams: { handle },
  })

  const product = response.products[0]

  return {
    title: product?.title ?? handle,
    description: product?.description ?? "",
  }
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params
  const { countryCode, handle } = params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const { response } = await listProducts({
    countryCode,
    queryParams: { handle },
  })

  const product = response.products[0]
  if (!product) notFound()

  const images = product.images ?? []

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: dictionary.header.logo, href: `/${countryCode}/shop` },
          { label: product.title ?? handle },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Gallery - 60% on desktop */}
        <div className="md:col-span-3">
          <ImageGallery images={images} productTitle={product.title ?? ""} />
        </div>

        {/* Info - 40% on desktop */}
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold text-shop-text-primary mb-2">
            {product.title}
          </h1>
          <div className="mb-4">
            <ProductPrice product={product} region={region} />
          </div>
          {product.description && (
            <p className="text-shop-text-secondary text-sm mb-6 leading-relaxed">
              {product.description}
            </p>
          )}
          <ProductActions product={product} countryCode={countryCode} dictionary={dictionary} />
        </div>
      </div>
    </Container>
  )
}
