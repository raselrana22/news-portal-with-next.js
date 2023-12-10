import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex flex-row space-x-2">
      <div>
        <Link href={"/"}>Home</Link>
      </div>
      <div>
        <Link href={"/user/registration"}>Registration</Link>
      </div>
      <div>
        <Link href={"/user/login"}>Login</Link>
      </div>
    </div>
  );
}
