interface IBaseField {
  createdAt?: string
  updatedAt?: string
  id: string | number
  name: string
}

// export interface UserPayloadInterface extends Pick<IBaseField, 'name'> {
export interface UserPayloadInterface {
  email?: string
  password?: string
  passwordConfirm?: string
  remember?: boolean
  token?: string
}

export interface NewsPayloadInterface extends Pick<IBaseField, 'name'> {
  type: string
  famousPerson: string
  place: string
  length: number
  checkboxPublic: boolean
  checkboxActive: boolean
}

export interface NavLink {
  to: string
  name?: string
  active?: boolean
}

export interface InputProps {
  label: string
  error: string | undefined | string[]
  required?: boolean
  placeholder?: string
  autofocus?: boolean
  type?: 'number' | 'email' | 'password'
  modelValue: string
  tooltip?: string
}

export interface InputSliderProps
  extends Omit<InputProps, 'modelValue' | 'type'> {
  min: number
  max: number
  step: number
  modelValue: string | number
}

export interface Option extends Pick<IBaseField, 'id' | 'name'> {
  value: string
}

export interface SelectProps {
  label: string
  error: string | undefined | string[]
  required?: boolean
  options: Option[] | []
  modelValue: string
  tooltip?: string
}

export interface CheckboxProps {
  label: string
  error: string | undefined | []
  required?: boolean
  modelValue: boolean
}

export interface IUser extends IBaseField {
  email: string
  photo: string | null
  role: string
  position: string
}

export interface IAuthStore {
  isAuthenticated: boolean
  isLoading: boolean
  isLoadingLocal: boolean
  errors: Object
  error: string
  success: boolean
  user: IUser
}

export interface ISubsription extends IBaseField {
  price: number
  description: string
  allowedRequiests: number
  features: string[]
}

export interface IComment extends Pick<IBaseField, 'createdAt' | 'id'> {
  comments: IComment[]
  comment: string
  news: string
  user: IUser
  parentId: string
}

export interface News extends IBaseField {
  autor: IUser
  autors: IUser[]
  checkboxActive: boolean
  checkboxPublic: boolean
  comments: IComment[]
  description: string
  durationWeeks: null
  famousPerson: string
  imageCover: string
  images: string[]
  newsLength: number
  place: string
  ratingsAverage: number
  ratingsQuantity: number
  secretNews: boolean
  slug: string
  type: string
}

// export type QueryOptions = {
//   limit?: number
//   sort?: 'desc' | 'asc'
//   category?: string
// }

// export type QueryParameters = Record<
//   string,
//   string | number | boolean | undefined
// >

// export type Category = string
