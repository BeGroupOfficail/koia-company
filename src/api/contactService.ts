const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  job_title?: string;
  company_name?: string;
  message: string;
};

export async function sendContactData(formData: ContactFormData) {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BACKEND_BASE_URL}/contact-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to send contact data:", data);
      return {
        success: false,
        message: data?.message || "Failed to send contact data",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching home data:", error);

    return {
      success: false,
      message: "Unable to connect to the server. Please try again later.",
    };
  }
}
