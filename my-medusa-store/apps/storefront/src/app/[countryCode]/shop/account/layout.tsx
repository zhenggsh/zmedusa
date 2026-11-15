import { retrieveCustomer } from "@lib/data/customer"

export default async function ShopAccountLayout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode
  login: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <div>
      {customer ? dashboard : login}
    </div>
  )
}
