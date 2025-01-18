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
