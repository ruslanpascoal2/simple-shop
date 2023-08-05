"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Invalid name" }),
});

export function StoreModal() {
  const { isOpen, onClose } = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post("api/stores", values);
      toast.success("Store created!")
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Create store"
      description="Add a new store"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My Shoes Store"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
