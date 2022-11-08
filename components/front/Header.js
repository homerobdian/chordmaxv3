import { useRouter } from "next/router";
import Link from "next/link";
import SearchLayout from "./SearchLayout";

export default function Header() {
  let nextRouter = useRouter();

  let menuItems = [
    { title: "Album", path: "/album", external: false },
    { title: "Contact", path: "/contact", external: false },
  ];

  return (
    <header className="p-4 border  border-slate-100  dark:border-slate-700 rounded-xl">
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => nextRouter.push("/")}>
          <span className="text-lg sm:text-xl text-teal-500 font-bold">
            ChordMax
          </span>
        </button>
        <nav className="flex items-center gap-4">
          {menuItems.map((menuItem) => (
            <Link
              href={menuItem.path}
              key={menuItem.path}
              passHref
              legacyBehavior
            >
              <a
                className={
                  nextRouter.pathname === menuItem.path
                    ? "font-medium text-slate-700 dark:text-slate-200"
                    : "text-slate-600 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-200"
                }
                aria-current={
                  nextRouter.pathname === menuItem.path ? "page" : "false"
                }
                target={menuItem.external ? "_blank" : "_self"}
                rel={menuItem.external ? "nofollow noreferrer" : "self"}
              >
                <span className="text-sm">{menuItem.title}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <SearchLayout />
    </header>
  );
}
