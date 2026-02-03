import MainTest from "./maintest";
import { Jua } from "next/font/google";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
});

export default function Page() {
  return (
    <div className={jua.className}>
      <MainTest />
    </div>
  );
}