"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type BillboardDeleteButtonProps = ButtonProps & {
      dataId: string;
};

const ItemDeleteButton: React.FC<BillboardDeleteButtonProps> = ({
      dataId,
      className,
      children,
      ...props
}) => {
      const router = useRouter();
      const { mounted } = useMounted();
      const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

      if (!mounted) {
            return null;
      }

      async function onSubmit(dataId: string) {
            setIsDeleting(true);

            const response = await fetch(
                  `/api/data/${dataId}`,
                  {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                        },
                  },
            );

            setIsDeleting(false);

            if (!response?.ok) {
                  return toast.error("Something went wrong", {
                        description:
                              "Your item was not deleted. Please try again.",
                  });
            }

            router.refresh();

            return toast.success("Your item is successfully removed.", {
                  description: "please refer table to check updates",
            });
      }
      return (
            <AlertDialog>
                  <AlertDialogTrigger asChild>
                        <Button
                              className={cn("items-start", className)}
                              disabled={isDeleting}
                              variant="destructive"
                              {...props}
                        >
                              <Trash2 />
                        </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                              <AlertDialogTitle>
                                    Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                    This action cannot be undone. This will permanently
                                    delete your billboard and remove your data from our
                                    servers.
                              </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                              <AlertDialogCancel disabled={isDeleting}>
                                    Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                    onClick={() => onSubmit(dataId)}
                                    disabled={isDeleting}
                              >
                                    Continue
                              </AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
};

export { ItemDeleteButton };