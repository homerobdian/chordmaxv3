import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import("../../../components/front/Posts.js"), {
  ssr: false,
});

const Singer = ({ data, slug }) => {
  const home = false;
  return (
    <>
      <article className="prose max-w-none prose-slate dark:prose-invert">
        <Posts blogPosts={data} singerslug={slug} home={home} />
      </article>
    </>
  );
};

// pages/blog/[slug].js
export async function getStaticPaths() {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/client/singer/getallslugsinger`
  );
  const paths = response.data.map((singer) => ({
    params: {
      singerslug: `${singer.slug}`,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.singerslug;
  // Fetch data from external API
  const singer = await axios.get(
    `${process.env.BASE_URL}/api/client/singer/getsingerbyslug?slug=${slug}`
  );

  const list = await axios.get(
    `${process.env.BASE_URL}/api/client/song/getsonglistbysingerid?id=${singer.data.singerId}`
  );

  const data = list.data;
  return {
    props: { data, slug }, // will be passed to the page component as props
  };
}

export default Singer;
