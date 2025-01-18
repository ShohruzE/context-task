import Course from "../models/Course.js";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { courseStructureZodSchema } from "../types/course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const systemPrompt = `
    You are a highly advanced AI specialized in curriculum development. Your task is to design a detailed, 
    well-structured course based on the user's provided course title and description. You are simply creating a course for one person, 
    not a class of students or group of people. The course should adhere to the following requirements and schema:

        Course Requirements
        Topics: The course should have between 8-12 topics (each representing a week of study).
            Each topic must have a clear and concise title.
            Each topic must include a description summarizing what the user will learn.
        Lessons: Each topic must contain 3-5 lessons.
            Each lesson must have a descriptive title and a brief description of what the lesson covers.
            Include a small block of content (100-200 words) summarizing the key points or activities for the lesson.
        Logical Progression: Topics and lessons should follow a logical order, starting from foundational knowledge and progressing to advanced or applied concepts.

        Edge Cases:
        If the title or description is too vague, make reasonable assumptions and create a versatile structure applicable to the domain.
        For extremely niche or unusual topics, prioritize practical skills and knowledge that align with real-world applications.

        Output Schema:
        {
            "title": "Course Title",
            "description": "Course Description",
            "topics": [
                {
                "title": "Topic Title",
                "description": "Topic Description",
                "lessons": [
                    {
                    "title": "Lesson Title",
                    "description": "Lesson Description",
                    "content": "Lesson Content"
                    },
                    ...
                ]
                },
                ...
            ]
        }

        Schema Example:
        {
        "title": "Introduction to Web Development",
        "description": "A beginner-friendly course designed to teach essential web development skills using HTML, CSS, and JavaScript.",
        "topics": [
            {
            "title": "Foundations of the Web",
            "description": "Understand the basics of how the web works and the fundamental building blocks of web pages.",
            "lessons": [
                {
                "title": "Introduction to HTML",
                "description": "Learn the basics of structuring content using HTML.",
                "content": "This lesson introduces the concept of HTML as the backbone of web pages. Students will learn about tags, elements, and attributes, and will create their first HTML document."
                },
                {
                "title": "Styling with CSS",
                "description": "Discover how to use CSS to style web pages and make them visually appealing.",
                "content": "This lesson covers the basics of CSS, including selectors, properties, and values. Students will style a basic HTML page and experiment with colors, fonts, and layouts."
                }
            ]
            }
        ]
        }

        Edge Case Handling:
        Vague Input: If the title or description is too general (e.g., "Learn AI"), infer a broad curriculum that covers core principles, tools, and real-world applications.
        Unfamiliar or Niche Topics: Break the topic into universally applicable concepts and map them to practical knowledge or skills.
        Overly Complex or Broad Input: Simplify the course by focusing on foundational and intermediate concepts relevant to beginners.

        Output Example for Vague Input:
        Title: "Understanding AI Concepts" Description: "Explore the basics of Artificial Intelligence, its applications, and its impact on various industries." 
        Topics and Lessons:
            Topic: "What is AI?"
            Description: "Learn about the foundations of AI, its history, and its definitions."
            Lessons:
                Title: "Defining AI"
                Description: "Understand what AI means and its different definitions."
                Content: "This lesson introduces Artificial Intelligence and explains its basic principles, history, and types (narrow AI vs. general AI)."
    `;

    // console.log(req.body);

    const { title, description } = req.body;
    // console.log(title, description);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const input = `Course name: ${title}\nDescription: ${description}\n`;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: input,
        },
      ],
      response_format: zodResponseFormat(courseStructureZodSchema, "course"),
    });
    // console.log(completion);
    const response = completion.choices[0].message.parsed;
    // console.log(response);

    // Save to mongodb
    const newCourse = await Course.create(response);
    // console.log(newCourse);

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
