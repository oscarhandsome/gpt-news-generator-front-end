export interface UserPayloadInterface {
  name?: string
  email: string
  password: string
  passwordConfirm?: string
  remember?: boolean
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

export interface User {
  createdAt: string
  email: string
  name: string | null
  photo: string | null
  role: string
  updatedAt: string
  _id: string
}

export interface Subsription {
  price: number
  description: string
  allowedRequiests: number
  features: string[]
  createdAt: string
  updatedAt: string
  _id: string
  name: string
}

export interface News {
  autor: User
  autors: User[]
  checkboxActive: boolean
  checkboxPublic: boolean
  createdAt: string
  description: string
  durationWeeks: null
  famousPerson: string
  id: string
  imageCover: string
  images: string[]
  newsLength: 50
  name: string
  place: string
  ratingsAverage: number
  ratingsQuantity: number
  secretNews: boolean
  slug: string
  type: string
  updatedAt: string
  _id: string
}
