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
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import SOUND_MODELS, { SoundModel } from "@/lib/constants";

// Define the validation schema using zod
const FormSchema = z.object({
  soundModel: z.string({
    required_error: "Please select a Hugging Face sound model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Props interface for the GenerateSoundForm component
interface GenerateSoundFormProps {
  handleGetAudio: (data: CreateSoundRequest) => void;
}

// The main component for generating sound using the specified form
export function GenerateSoundForm({ handleGetAudio }: GenerateSoundFormProps) {
  // State to manage form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the zod resolver
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Form submission handler
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);

    // Create a sound request object using the form data
    const soundRequest: CreateSoundRequest = {
      modelUrl: data.soundModel,
      text: data.text,
    };

    // Call the provided handler to get audio using the sound request
    handleGetAudio(soundRequest);

    setFormSubmitting(false);
  }

  return (
    <div className="ml-8 mr-8">
      {/* Render the form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Sound Model Field */}
          <FormField
            control={form.control}
            name="soundModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sound Model</FormLabel>
                {/* Dropdown for selecting sound models */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sound model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectContent>
                      {/* Loop through the available sound models from the constants file */}
                      {SOUND_MODELS.map((model: SoundModel, index: number) => (
                        // Create a selectable option for each sound model
                        <SelectItem
                          key={`${model.name}-${index}`}
                          value={model.url}
                        >
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This model will generate your sound.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Text Field */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                {/* Text area for entering the input text */}
                <FormControl>
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter your text here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The text used to convert to sound.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={formSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
