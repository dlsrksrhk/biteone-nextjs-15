import ClientComponent from "@/comonents/client-component";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      서치 페이지 {q}{" "}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
