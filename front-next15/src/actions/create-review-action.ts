"use server";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  console.log("createReviewAction", content, author);

  if (!bookId || !content || !author) {
    return;
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

    console.log("리뷰 등록 성공");
  } catch (error) {
    console.error("리뷰 등록 실패", error);
  }
}
