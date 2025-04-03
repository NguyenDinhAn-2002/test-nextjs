import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className={styles.ctas}>
          <span>Nguyễn Đình An xin chào NextJS</span>
          </div>
          <a href="/search" className="secondary">Trang tìm kiếm</a>
          <a href="/login" className="primary">Trang đăng nhập</a>
          <a href="/register" className="secondary">Trang đăng ký</a>
      </main>
    </div>
  );
}
