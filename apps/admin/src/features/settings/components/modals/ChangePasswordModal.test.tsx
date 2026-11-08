import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionGlobalConfig } from 'motion/react'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { I18nProvider } from '~/i18n'
import { ModalRoot } from '~/ui/feedback/modal-imperative'
import { FloatLayerProvider } from '~/ui/overlay/floating-layer'

import { PasswordSection } from '../account/PasswordSection'

let root: Root
let queryClient: QueryClient

beforeEach(() => {
  MotionGlobalConfig.skipAnimations = true
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  queryClient.clear()
  document.body.innerHTML = ''
  MotionGlobalConfig.skipAnimations = false
})

it('opens the change-password modal when ModalRoot is outside the router', async () => {
  await act(async () =>
    root.render(
      <QueryClientProvider client={queryClient}>
        <FloatLayerProvider>
          <I18nProvider>
            <MemoryRouter>
              <PasswordSection />
            </MemoryRouter>
            <ModalRoot />
          </I18nProvider>
        </FloatLayerProvider>
      </QueryClientProvider>,
    ),
  )

  const button = document.querySelector('button')
  expect(button).not.toBeNull()

  await act(async () => button!.click())

  expect(document.querySelector('form')).not.toBeNull()
})
