import { ReactNode, useState } from "react"

export const useDialogConfirm = () => {
    const [dialogConfirm, setDialogConfirm] = useState<{
        open: boolean
        type: "confirm" | "cancel" | "check" | "star" | "language" | "warning"
        action: 'ADD' | 'EDIT' | 'DELETE' | 'LEAVE' | 'SUCCESS' | string
        title?: string
        description?: string

        textClose?: string
        textSubmit?: string

        showClose?: boolean
        showSubmit?: boolean

        loading?: boolean
        showLoading?: boolean

        classSubmit?: string
        classClose?: string

        persistent?: boolean

        trigger?: ReactNode
        heading?: ReactNode
        footerLeft?: ReactNode
        footerRight?: ReactNode

        onCancel?: () => void
        onSubmit?: () => void
    }>({ open: false, type: "confirm", action: "SUCCESS" })

    return {
        dialogConfirm,
        setDialogConfirm
    }
}
