import type { Component } from 'nuxt/schema'

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
  category: string
  famousPerson: string
  place: string
  // length: number
  isPublic: boolean
  isActive: boolean
  newsLength: 50
  ratingsAverage: number
  // imageModelId: string
  promptStrength: number
  steps: number
  imageCount: number
}

export interface NavLink {
  to: string
  name?: string
  active?: boolean
  icon?: Component
}

export interface InputProps {
  label: string
  error: string | undefined | string[]
  required?: boolean
  placeholder?: string
  autofocus?: boolean
  type?: 'number' | 'email' | 'password' | 'text'
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

export interface ISelectProps {
  label: string
  error: string | undefined | string[]
  required?: boolean
  options: Option[] | [] | string[]
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

export interface INews extends IBaseField {
  autor: IUser
  autors: IUser[]
  isActive: boolean
  isPublic: boolean
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
  category: string
  workflowRunId: string
}

export type NewsForm = {
  name: string
  type: string
  category: string
  famousPerson: string
  place: string
  newsLength: 50
  isPublic: boolean
  isActive: boolean
  ratingsAverage: number
  // imageModelId: string
  promptStrength: number
  steps: number
  imageCount: number
}

export type Stats = {
  news: string
  contributors: string
  organizations: string
}

export type QueryOptions = {
  limit?: number
  sort?: 'desc' | 'asc'
  category?: string
}

// export type QueryParameters = Record<
//   string,
//   string | number | boolean | undefined
// >

export type Category = string
