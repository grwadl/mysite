import { LoginService } from '@/service/api/LoginService'
import { ProductService } from '@/service/api/ProductService'
import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from './reducers/filters-reducer'
import { loginReducer } from './reducers/login-reducer'
import { productReducer } from './reducers/products-reducer'
import { queryReducer } from './reducers/query-reducer'

const extraArgument = {
  LoginService,
  ProductService
}

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    filters: filterReducer,
    query: queryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    })
})

export { store, extraArgument }
