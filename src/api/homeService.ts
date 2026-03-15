const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchHomeData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/home`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch home data:", data);
      return { success: false, message: "Failed To Fetch Home Data" };
    }

    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);

    return {
      success: false,
      message: "Unable to connect to the server. Please try again later.",
    };
  }
}
