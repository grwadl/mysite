import { Loader } from '@/components/base/loading/Loader'
import { UpperInfo } from '@/components/product-page/upper-info/UpperInfo'
import { fetchCurrentProduct, fetchLatestProducts } from '@/redux/actions/product-page-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { IProduct } from '@/redux/types/reducers/products'
import React, { Suspense, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ProductSliderWrapper = React.lazy(() => import('@/components/product-page/product-sliders/ProductSliders'))

type Params = {
  id: string
}

const ProductPage = () => {
  const { id } = useParams<Params>()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { isLoading, latestProducts, product } = useAppSelector(({ productPage }) => productPage)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    if (!id) return
    dispatch(fetchCurrentProduct(+id))
      .unwrap()
      .catch(() => navigate('/'))
  }, [id])

  useEffect(() => {
    dispatch(fetchLatestProducts())
      .unwrap()
      .catch(() => navigate('/'))
  }, [])

  const keyboards = useMemo(
    () => latestProducts?.filter((p) => p.id !== (product as IProduct)?.id),
    [latestProducts, product]
  )

  if (isLoading)
    return (
      <div className="relative">
        <Loader className="absolute top-20 left-1/2" />
      </div>
    )

  if (!product?.id && !isLoading) navigate('/')

  return (
    <div className="relative">
      {!!product && <UpperInfo keyboard={product} />}
      <Suspense fallback={<Loader />}>
        <ProductSliderWrapper keyboards={keyboards} />
      </Suspense>
    </div>
  )
}

export { ProductPage }
