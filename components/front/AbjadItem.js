import Link from "next/link";
import { lowerCase } from "lower-case";
export default function AbjadItem({ abjad }) {
  const data = lowerCase(abjad);
  return (
    <div className="p-0 m-0">
      <Link href={`/album/abjad/${data}`} legacyBehavior>
        <a className="block p-4 m-0 no-underline border rounded-lg border-slate-100 bg-slate-50 dark:border-slate-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-slate-800 sm:dark:hover:bg-slate-800">
          <h4 className="m-0 text-white">{abjad}</h4>
        </a>
      </Link>
    </div>
  );
}
