"use server";

interface FormData {
  title: string;
  description: string;
}

export async function createCourse(prevState: FormData, formData: FormData) {
  formData = {
    title: formData.title.trim(),
    description: formData.description.trim(),
  };
  if (formData.title.length < 2 || formData.description.length < 2) {
    return {
      error: "Title and description must be at least 2 characters long",
    };
  }

  console.log(formData);

  try {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    return { error: "Error: " + error };
  }
}
