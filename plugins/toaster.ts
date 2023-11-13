// plugins/toaster.ts
import MyToast from '~/components/Base/BaseToast.vue'

interface ToasterOptions {
  message: string
  title?: string
}

export default defineNuxtPlugin(() => {
  // define or import a theme
  const theme = {
    containerId: 'nt-container-bottom-right',
    containerClass: [
      'absolute',
      'inset-0',
      'pointer-events-none',
      'p-4',
      'flex',
      'flex-col-reverse',
      'items-start',
      'gap-2',
    ],
    wrapperClass: ['pointer-events-auto', 'cursor-pointer'],
  }

  // set default show options here
  const nt = createNinjaToaster({
    theme,
    maxToasts: 5,
    transition: {
      enterActiveClass: 'transition duration-300 ease-out',
      enterFromClass: 'transform translate-x-full opacity-0',
      enterToClass: 'transform translate-x-0 opacity-100',
      leaveActiveClass: 'transition duration-300 ease-in',
      leaveFromClass: 'transform translate-x-0 opacity-100',
      leaveToClass: 'transform translate-x-full opacity-0',
    },
  })

  const toaster = {
    info(options: ToasterOptions) {
      nt.show(() =>
        h(MyToast, {
          ...options,
          type: 'info',
        }),
      )
    },
    async error(options: ToasterOptions) {
      // wait for the toast to be mounted
      const { el, close } = await nt.show(() =>
        h(MyToastError, {
          ...options,
          type: 'error',
        }),
      )

      // focus the toast once it's mounted
      el.focus()
    },
    close() {
      // close all toasts
      nt.closeAll()

      // or close toasts in a specific containerId
      nt.close('nt-container-bottom-right')

      // or close toasts using a theme
      nt.close(theme)
    },
  }

  return {
    provide: {
      toaster,
    },
  }
})
