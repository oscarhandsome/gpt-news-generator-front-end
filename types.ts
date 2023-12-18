interface IBaseField {
  createdAt?: string
  updatedAt?: string
  id: string
  name: string
}

export interface UserPayloadInterface {
  name?: string
  email?: string
  password?: string
  passwordConfirm?: string
  remember?: boolean
  token?: string
}

export interface NewsPayloadInterface {
  name: string
  type: string
  famousPerson: string
  place: string
  length: number
  checkboxPublic: boolean
  checkboxActive: boolean
}

export interface NavLink {
  to: string
  name: string
  active: boolean
}

export interface InputProps {
  label: string
  error: string | undefined | []
  required?: boolean
  placeholder?: string
  autofocus?: boolean
  type?: 'string' | 'number' | 'email' | 'password'
  modelValue?: string | undefined | null
  tooltip?: string
}

export interface InputSliderProps extends InputProps {
  min: number
  max: number
  step: number
}

export interface Option {
  id: number
  name: string
  value: string
}

export interface SelectProps {
  label: string
  error: string | undefined | []
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

export interface IComment {
  comments: IComment[]
  comment: string
  createdAt: string
  id: string
  news: string
  user: IUser
}

export interface News {
  autor: IUser
  autors: IUser[]
  checkboxActive: boolean
  checkboxPublic: boolean
  comments: Comment[] | [] | null
  createdAt: string
  description: string
  durationWeeks: null
  famousPerson: string
  id: string
  imageCover: string
  images: string[]
  newsLength: number
  name: string
  place: string
  ratingsAverage: number
  ratingsQuantity: number
  secretNews: boolean
  slug: string
  type: string
  updatedAt: string
}
