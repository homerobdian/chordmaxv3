import { NextSeo } from "next-seo";
import axios from "axios";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import("../components/front/Posts.js"), {
  ssr: false,
});

export default function Index({ data, popular }) {
  const home = true;
  return (
    <>
      <NextSeo
        title={`ChordMax - Kunci Gitar Terlengkap`}
        description={`Kumpulan Chord Kunci Gitar Terlengkap Terupdate, dari kunci gitar indonesia maupun lagu manca negara dari kunci dasar ataupu kunci original`}
        canonical="https://chordmax.com"
        openGraph={{
          url: "https://chordmax.com",
          title: `ChordMax - Kunci Gitar Terlengkap`,
          description: `Kumpulan Chord Kunci Gitar Terlengkap Terupdate, dari kunci gitar indonesia maupun lagu manca negara dari kunci dasar ataupu kunci original`,
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          siteName: "ChordMax",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <article className="prose max-w-none prose-slate dark:prose-invert">
        <p className="lead text-cyan-50">
          Welcome to my website. Here you will find posts about things.
        </p>

        <h2 className="text-teal-600 mt-9 text-lg font-semibold">
          Popular Chord
        </h2>
        <Posts blogPosts={popular} home={home} />
        <h2 className="text-teal-600 mt-9 text-lg font-semibold">
          Latest Posts
        </h2>
        <Posts blogPosts={data} home={home} />
      </article>
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/client/song/getlatestsong`
  );

  const popData = await axios.get(
    `${process.env.BASE_URL}/api/client/song/getpopularsong`
  );

  const data = response.data;
  const popular = popData.data;

  return { props: { data, popular } };
}
