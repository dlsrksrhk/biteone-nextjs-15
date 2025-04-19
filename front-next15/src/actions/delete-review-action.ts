"use server";

import { revalidatePath } from "next/cache";

export async function deleteReviewAction(state: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const reviewId = formData.get("reviewId")?.toString();
  console.log("deleteReviewAction", state, bookId, reviewId);

  if (!reviewId) {
    return {
      status: false,
      message: "삭제할 리뷰가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("리뷰 삭제에 실패했습니다.");
    }

    revalidatePath(`/book/${bookId}`);

    return {
      status: true,
      message: "리뷰 삭제제에 성공했습니다.",
    };
  } catch (error) {
    console.error("리뷰 삭제 실패", error);
    return {
      status: false,
      message: "리뷰 삭제제에 실패했습니다.",
    };
  }
}
