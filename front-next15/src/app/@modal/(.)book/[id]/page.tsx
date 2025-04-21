import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  console.log("가로채기 성공!!");
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
