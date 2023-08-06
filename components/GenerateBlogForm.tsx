'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState } from "react";

const FormSchema = z.object({
  textModel: z.string({
    required_error: "Please select an text model to use.",
  }),
  blogTitle: z.string({
    required_error: "Please select a blog title.",
  }),
  blogTone: z.string({
    required_error: "Please select a blog tone.",
  }),
});

interface GenerateBlogFormProps{
  handleCreateBlogPost: (data:CreateBlogRequest) => void;
}

export function GenerateBlogForm({handleCreateBlogPost}:GenerateBlogFormProps) {
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Do something with the data...
    setFormSubmitting(true);

    const blogRequest :CreateBlogRequest = {
      model:data.textModel,
      title:data.blogTitle,
      tone:data.blogTone
    }
    handleCreateBlogPost(blogRequest);
  }

  return (
    <div className="ml-8 mr-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="textModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">CHAT GTP 3.5</SelectItem>
                    <SelectItem value="m@google.com">LAMA 2</SelectItem>
                    <SelectItem value="m@support.com">BERT</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This model will generate your blog.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blogTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input disabled={formSubmitting} placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>The name given to your blog</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blogTone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Tone</FormLabel>
                <Select
                disabled={formSubmitting}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone of the blog" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">Serious</SelectItem>
                    <SelectItem value="m@google.com">Happy</SelectItem>
                    <SelectItem value="m@support.com">Child Like</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This model will generate your blog.{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={formSubmitting}>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
