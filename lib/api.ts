const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RegisterUserDto = {
  username: string;
  email: string;
  password: string;
};

type LoginUserDto = {
  email: string;
  password: string;
};

interface User {
  id: string;
  username: string;
  email: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  status: "processing" | "completed" | "failed";
  videoUrl: string | null;
  uploader: User;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: string;
}

// --- Hàm xử lý Response chung ---
async function handleResponse(response: Response) {
  if (response.ok) {
    if (
      response.status === 204 ||
      response.headers.get("Content-Length") === "0"
    ) {
      return null;
    }
    return response.json();
  } else {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "An error occurred from the server.");
  }
}

// --- API Client Object ---
export const api = {
  // --- Auth Endpoints ---
  async login(credentials: LoginUserDto): Promise<{ accessToken: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  async register(data: RegisterUserDto): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async getProfile(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  // --- Videos Endpoints ---
  async getVideos(): Promise<Video[]> {
    const response = await fetch(`${API_BASE_URL}/videos`);
    return handleResponse(response);
  },

  async getVideoById(id: string): Promise<Video> {
    try {
      const response = await fetch(`http://localhost:3000/videos/${id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error("Video not found or server error.");
    }
  },

  async uploadVideo(
    data: { title: string; description?: string; videoFile: File },
    token: string
  ): Promise<Video> {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("videoFile", data.videoFile);

    const response = await fetch(`http://localhost:3000/videos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return handleResponse(response);
  },

  async postComment(
    data: { content: string; videoId: string },
    token: string
  ): Promise<Comment> {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};
