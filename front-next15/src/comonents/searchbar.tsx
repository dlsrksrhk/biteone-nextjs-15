"use client";
import { useRouter } from "next/navigation"; //앱 라우터 버전의 라우터
import { useState } from "react";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // 동일한 값을 계속 검색하는 경우에는 동작 안하도록
    // if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
