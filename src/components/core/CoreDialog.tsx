import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: LucideIcon;
  iconClassName?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  loading?: boolean;
}

const maxWidthClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export function CoreDialog({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconClassName = "",
  children,
  footer,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmVariant = "default",
  maxWidth = "md",
  loading = false,
}: CoreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          maxWidthClasses[maxWidth],
          "max-h-[90vh] flex flex-col"
        )}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className={`h-5 w-5 ${iconClassName}`} />}
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {(footer || onConfirm || onCancel) && (
          <DialogFooter className="flex-shrink-0">
            {footer || (
              <>
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    {cancelText}
                  </Button>
                )}
                {onConfirm && (
                  <Button
                    type="submit"
                    variant={confirmVariant}
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}