"use server";

import { revalidatePath } from "next/cache";

export interface CreateReviewState {
  status: boolean;
  message: string;
}

export async function createReviewAction(
  state: CreateReviewState,
  formData: FormData
) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log("createReviewAction", content, author);

  if (!bookId || !content || !author) {
    return {
      status: false,
      message: "내용과 작성자를를를 입력해야 합니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("리뷰 등록에 실패했습니다.");
    }

    revalidatePath(`/book/${bookId}`);

    return {
      status: true,
      message: "리뷰 등록에 성공했습니다.",
    };
  } catch (error) {
    console.error("리뷰 등록 실패", error);
    return {
      status: false,
      message: "리뷰 등록에 실패했습니다.",
    };
  }
}
