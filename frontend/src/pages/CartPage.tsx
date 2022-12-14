import cartEmpty from '@/assets/images/empty-cart.svg'
import Button from '@/components/UI/Button'
import CommonHeading from '@/components/UI/CommonHeading'
import { MessageBox } from '@/components/UI/MessageBox'
import { CartList } from '@/components/cart-page/CartList'
import { TotalPayment } from '@/components/cart-page/payment/TotalPayment'
import { useAppSelector } from '@/redux/common/hooks'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const addedToCartQuantity = useMemo(() => user?.cart.length, [user?.cart.length])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.email) navigate('../', { replace: true })
  }, [user?.email])

  if (!addedToCartQuantity)
    return (
      <MessageBox
        className="cart-page w-full h-full flex flex-col justify-center items-center"
        imageSrc={cartEmpty}
        subtitle="Unfortunately your cart is empty... But You can go and buy something"
        title="Your cart is empty :("
      >
        <Link to="/">
          <Button className="py-2 px-3 text-lg mt-7">Catalog</Button>
        </Link>
      </MessageBox>
    )

  return (
    <div className="cart-page">
      <CommonHeading subtitle={`${addedToCartQuantity} product(s)`} title="Cart" />
      <div className="cart-wrapper mt-5 flex flex-wrap">
        {user?.cart && <CartList className="flex-0 basis-full xl:basis-3/5" cart={user.cart} />}
        {user && <TotalPayment className="flex-0 basis-full xl:basis-2/5" user={user} />}
      </div>
    </div>
  )
}

export { CartPage }
