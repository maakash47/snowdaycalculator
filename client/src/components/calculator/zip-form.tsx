import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const zipSchema = z.object({
  zipCode: z.string().length(5, "ZIP code must be 5 digits")
});

interface ZipFormProps {
  onSubmit: (zipCode: string) => void;
  isLoading: boolean;
}

export default function ZipForm({ onSubmit, isLoading }: ZipFormProps) {
  const form = useForm<z.infer<typeof zipSchema>>({
    resolver: zodResolver(zipSchema),
    defaultValues: {
      zipCode: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(data => onSubmit(data.zipCode))} className="space-y-4">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    placeholder="Enter ZIP code"
                    className="w-48"
                    type="text"
                    maxLength={5}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Calculating..." : "Calculate"}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
