import {
  DocumentIcon,
  PencilSquareIcon as EditIcon,
  ListBulletIcon as ViewListIcon,
  CreditCardIcon,
} from '@heroicons/vue/20/solid'
import type { NavLink } from '@/types'

const dropdownMenu: NavLink[] = [
  {
    to: '/news/create',
    name: 'Create news',
    icon: DocumentIcon,
  },
  {
    to: '/subscriptions/my-subsriptions',
    name: 'My subsriptions',
    icon: CreditCardIcon,
  },
  {
    to: '/news/my-news',
    name: 'My news',
    icon: ViewListIcon,
  },
  {
    to: '/me',
    name: 'Edit account',
    icon: EditIcon,
  },
]

export { dropdownMenu }
