import type { NavLink } from 'types'

const mainMenu: NavLink[] = [
  {
    to: '/',
    name: 'Home',
    active: true,
  },
  {
    to: '/news',
    name: 'News',
    active: false,
  },
  {
    to: '/about-us',
    name: 'About Us',
    active: false,
  },
  {
    to: '/subscriptions',
    name: 'Subscriptions',
    active: false,
  },
  {
    to: '/faq',
    name: 'How it works?',
    active: false,
  },
]

export { mainMenu }
