export interface UserPayloadInterface {
  email: string
  password: string
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
