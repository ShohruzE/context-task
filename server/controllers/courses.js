import Course from "../models/Course.js";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  courseStructureZodSchema,
  validationSchema,
  slideSchema,
} from "../types/course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopicByCourseId = async (req, res) => {
  try {
    const { courseId, topicId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    const topic = course.topics.id(topicId);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLessonByIds = async (req, res) => {
  try {
    const { courseId, topicId, lessonId } = req.params;

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find topic
    const topic = course.topics.id(topicId);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Find lesson
    const lesson = topic.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const input = `Course name: ${title}\nDescription: ${description}\n`;

    const systemPrompt1 = `
    You are a validation AI specialized in assessing user-provided course information. 
    Your task is to determine whether the input (course title and description) is valid, 
    meaningful, ethical, and suitable for creating a structured educational course. 
    If the input passes validation, the valid property should be true. 
    If it fails, the valid property should be true and the reason property should provide a clear error message explaining why it is invalid.

    Validation Criteria
    Meaningfulness:
      The title and description must contain coherent and understandable text.
      Gibberish, random strings, or nonsensical phrases should be flagged as invalid.

    Cohesion:
      The description must align with the title and provide sufficient context to generate a meaningful course structure.
      Flag inputs that are overly vague, irrelevant, or lack educational potential.

    Ethical Content:
      Ensure the title and description do not include harmful, unethical, or prohibited content such as:
      Hate speech
      Violence
      Illegal activities
      Misinformation
      Content violating societal or cultural norms
      Examples of unethical content include: "How to Hack Secure Systems" or "Building Harmful Weapons."
    Actionable Feedback:
    For invalid inputs, provide actionable feedback such as:
    "The title and description do not provide enough context for a cohesive course."
    "The content violates ethical guidelines and cannot be processed."

    Output Schema:
      {
        "valid": true | false,
        "reason": "If invalid, provide a clear explanation for why the input failed validation."
      }
    `;

    const validation = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt1,
        },
        {
          role: "user",
          content: input,
        },
      ],
      response_format: zodResponseFormat(validationSchema, "validation"),
    });
    const validationResponse = validation.choices[0].message.parsed;
    console.log(validationResponse);

    if (!validationResponse.valid) {
      return res.status(400).json({ error: validationResponse.reason });
    }

    const systemPrompt2 = `
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
        Unintelligible Input: If the title or description are not sensical or don't mean anything like gibberish, then refuse the input.
        Ethics: If the title or description have unethical content, then refuse the input.
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

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt2,
        },
        {
          role: "user",
          content: input,
        },
      ],
      response_format: zodResponseFormat(courseStructureZodSchema, "course"),
    });

    const response = completion.choices[0].message.parsed;

    // Save to mongodb
    const newCourse = await Course.create(response);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { content } = req.body;
    console.log(content);
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const input = `Lesson content: ${content}\n`;

    const systemPrompt = `
    You are an expert educator tasked with creating educational slides from lesson content.
    Transform the provided lesson content into a structured series of slides with bullet points.
    
    Requirements:
    - Create 5-8 slides
    - Each slide should have 3-5 bullet points
    - Bullet points should contain enough information to convey key concepts. Don't make them too short.
    - Include a descriptive title for each slide
    
    Output Schema:
    {
      "slides": [
        {
          "title": "Slide Title",
          "bulletPoints": [
            "Key point 1",
            "Key point 2",
            "Key point 3"
          ],
        }
      ]
    }`;

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
      response_format: zodResponseFormat(slideSchema, "slides"),
    });

    const slides = completion.choices[0].message.parsed;
    console.log(slides);
    res.status(201).json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
