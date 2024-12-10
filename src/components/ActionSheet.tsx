import { type ReactNode } from 'react'

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from './ui/actionsheet'

type Props = {
  show: boolean
  onDismiss: () => void
  children: ReactNode
}

export function ActionSheet({ show, onDismiss, children }: Props) {
  return (
    <Actionsheet isOpen={show} onClose={onDismiss}>
      <ActionsheetBackdrop />

      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {children}
      </ActionsheetContent>
    </Actionsheet>
  )
}
