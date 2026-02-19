import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="flex justify-between"
      style={{
        padding: "20px 40px",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="font-bold text-2xl ">Cinema Addicted</div>
      {/* Links */}
      <div className="flex gap-10">
        <Link href="/">خانه</Link>
        <Link href="/recommend">پیشنهاد فیلم</Link>
        <Link href="/articles">مقالات</Link>
        <Link href="/dialogues">دیالوگ‌ها</Link>
        <Link href="/about">درباره ما</Link>
      </div>
    </nav>
  );
}
