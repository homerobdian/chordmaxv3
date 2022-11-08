import Link from "next/link";
export default function SingerItem(data) {
  const singers = data.data.data;
  console.log(singers);
  return (
    <div>
      {singers &&
        singers.map((item) => (
          <div key={item._id} className="p-0 m-0 py-1">
            <Link href={`/album/${item.slug}`} legacyBehavior>
              <a className="block px-2 m-0 no-underline border rounded-lg border-slate-100 bg-slate-50 dark:border-slate-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-slate-800 sm:dark:hover:bg-slate-800">
                <h6 className="m-0 text-white">{item.singerName}</h6>
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
}
