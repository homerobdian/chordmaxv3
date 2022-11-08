import { format } from "date-fns";

export default function Post({
  path,
  title,
  description,
  date,
  singername,
  home,
  homesingerslug,
}) {
  const datestring = format(new Date(date), "MM/dd/yy");
  if (home) {
    return (
      <li className="p-0 m-0">
        <a
          href={`/album/${homesingerslug}/chord/${path}`}
          style={{ textDecoration: "none" }}
        >
          <a className="block px-2 m-0 no-underline border rounded-lg border-slate-100 bg-slate-50 dark:border-slate-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-slate-800 sm:dark:hover:bg-slate-800">
            <h5 className="m-0 text-slate-100">
              {title} - {singername}
            </h5>

            <div className="font-normal mb-1">
              <small className="flex gap-2">
                <time className="text-xs text-slate-500">{datestring}</time>
              </small>
            </div>
          </a>
        </a>
      </li>
    );
  } else {
    return (
      <li className="p-0 m-0">
        <a
          href={`/album/${homesingerslug}/chord/${path}`}
          style={{ textDecoration: "none" }}
        >
          <a className="block p-3 m-0 no-underline border rounded-lg border-slate-100 bg-slate-50 dark:border-slate-700 sm:bg-transparent sm:hover:bg-slate-50 dark:bg-slate-800 sm:dark:hover:bg-slate-800">
            <h5 className="m-0 text-slate-100">{title}</h5>

            <div className="font-normal">
              <p>{description}</p>

              <small className="flex gap-2">
                <time className="text-xs text-slate-500">{datestring}</time>
                <span className="text-xs text-slate-500">-</span>
                <span className="text-xs text-slate-500">{singername}</span>
              </small>
            </div>
          </a>
        </a>
      </li>
    );
  }
}
