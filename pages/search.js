import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import("../components/front/Posts.js"), {
  ssr: false,
});

export default function Search({ data, query }) {
  const router = useRouter();
  const home = true;
  console.log(router.pathname);
  return (
    <article className="prose max-w-none prose-slate dark:prose-invert">
      <p className="lead text-gray-300">Result search for {query}</p>

      <h2 className="text-teal-600">Hasil :</h2>
      <Posts blogPosts={data} home={home} />
    </article>
  );
}

export async function getServerSideProps(context) {
  const query = context.query.search;
  const response = await axios.get(
    `${process.env.BASE_URL}/api/client/song/searchsong?search=${query}`
  );

  const data = response.data;

  return { props: { data, query } };
}
