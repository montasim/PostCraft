"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

interface PasswordInputProps extends React.ComponentProps<typeof Input> {}

function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input {...props} type={visible ? "text" : "password"} />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 h-full px-3 text-muted-foreground hover:text-foreground"
        onClick={() => setVisible(!visible)}
        tabIndex={-1}
      >
        {visible ? (
          <IconEyeOff className="h-4 w-4" />
        ) : (
          <IconEye className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

export { PasswordInput }
