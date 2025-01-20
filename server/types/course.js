import { z } from "zod";

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
});

const topicSchema = z.object({
  title: z.string(),
  description: z.string(),
  lessons: z.array(lessonSchema),
});

export const courseStructureZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  topics: z.array(topicSchema),
});

export const validationSchema = z.object({
  valid: z.boolean(),
  reason: z.string(),
});

export const slideSchema = z.object({
  slides: z.array(
    z.object({
      title: z.string(),
      bulletPoints: z.array(z.string()),
    })
  ),
});
