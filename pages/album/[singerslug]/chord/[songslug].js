import React, { useState } from "react";
import axios from "axios";
import Prism from "prismjs";
import { NextSeo, ArticleJsonLd } from "next-seo";
import "primeicons/primeicons.css";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-php.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-ruby.js";
import "prismjs/components/prism-erb.js";
import "prismjs/components/prism-haml.js";
import Script from "next/script";
import NextBreadcumbs from "../../../../components/front/NextBreadcumbs.js";
const SongSlug = ({ data }) => {
  const [currentTranspose, setCurentTranspose] = useState(0);
  const chordPatern =
    /(\(*[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|M|dim|°|[0-9])*[\(]?[\d\/]*[\)]?(?:[CDEFGAB](?:b|bb)*(?:#|##|sus|maj|min|aug|m|M|°|[0-9])*[\d\/]*)*\)*)(?=[\s|$])(?! [a-z])/g;
  const songLyric = data.songLyric;
  const str = songLyric
    .replace(/\:/g, " : ")
    .replace(/\-/g, " - ")
    .replace(/\./g, " . ")
    .replace(/\,/g, " , ")
    .replace(/\]/g, " ] ")
    .replace(/\[/g, " [ ")
    .replace(/\*/g, " * ")
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .replace(/\=/g, " = ")
    .replace(/\…/g, " . ")
    .replace(/\|/g, " | ")
    .replace(/\&#(.*?);/g, " &#$1; ")
    .replace(/^[\s]+/, "")
    .replace(/[\s]+$/, "");
  const chordReplace = str.replace(chordPatern, function (value) {
    return (
      "<a class='chordmax-tooltip text-xs'>" +
      value +
      "<span class='text-xs custom chordmax-" +
      value +
      "'></span></a>"
    );
  });

  const setTransposeDown = () => {
    if (currentTranspose >= 0 && currentTranspose <= 13) {
      setCurentTranspose(currentTranspose - 1);
    }

    if (currentTranspose == 0) {
      setCurentTranspose(12);
    }
  };

  const setTransposePlus = () => {
    if (currentTranspose <= 12) {
      setCurentTranspose(currentTranspose + 1);
    }
    if (currentTranspose == 12) {
      setCurentTranspose(0);
    }
  };

  return (
    <>
      <NextSeo
        title={`Kunci Gitar ${data.songName} - ${data.singerName}`}
        description={`Kunci Gitar dasar ${data.songName} lagu ciptaan ${data.singername} chord dasara maupun chord balok chord original`}
        canonical="https://chordmax.com"
        openGraph={{
          url: "https://www.url.ie/a",
          title: `Kunci Gitar ${data.songName} - ${data.singerName}`,
          description: `Kunci Gitar dasar ${data.songName} lagu ciptaan ${data.singername} chord dasara maupun chord balok chord original`,
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
      <ArticleJsonLd
        url="https://example.com/article"
        title={`Kunci Gitar ${data.songName} - ${data.singerName}`}
        datePublished={data.createdAt}
        dateModified={data.updatedAt}
        authorName={[
          {
            name: "Chordmax",
            url: "https://chordmax.com",
          },
        ]}
        publisherName="ChordMax"
        publisherLogo="https://www.example.com/photos/logo.jpg"
        description={`Kunci Gitar dasar ${data.songName} - ${data.singerName}`}
        isAccessibleForFree={true}
      />
      <h2 className="text-2xl font-bold leading-normal mt-0 mb-2 text-white">
        Chord {data.songName} {data.singerName}
      </h2>
      <NextBreadcumbs
        singerslug={data.singerSlug}
        singername={data.singerName}
      />
      <article className="prose max-w-none prose-slate dark:prose-invert">
        <pre
          dangerouslySetInnerHTML={{ __html: chordReplace }}
          className="bg-slate-900 text-xs text-gray-300"
        />
        <span className="text-xs text-gray-300">
          {data.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Views
        </span>
      </article>

      <ul className="h-40 text-white text-center  border-red-500 fixed bottom-40 right-0 p-4">
        <span className="text-xs">Transpose</span>
        <li id="transup" onClick={setTransposePlus}>
          <button className="button">
            <i className="pi pi-plus-circle" style={{ fontSize: "1em" }}></i>
          </button>
        </li>
        <li>{currentTranspose}</li>
        <li id="transdown" onClick={setTransposeDown}>
          <button className="button">
            <i className="pi pi-minus-circle" style={{ fontSize: "1em" }}></i>
          </button>
        </li>
        <br />
        <span className="text-xs">Autoscroll</span>
        <li id="autoscrollup">
          <button className="button">
            <i className="pi pi-stop-circle" style={{ fontSize: "1em" }}></i>
          </button>
        </li>
        <li id="autoscrolldown">
          <button className="button">
            <i
              className="pi pi-angle-double-down"
              style={{ fontSize: "1em" }}
            ></i>
          </button>
        </li>
      </ul>
      <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" />
      <Script src="/js/chord.js" />
      <Script src="/js/autoscroll.js" />
    </>
  );
};

// This gets called on every request
export async function getServerSideProps(context) {
  const slug = context.params.songslug;
  // Fetch data from external API
  const res = await axios.get(
    `${process.env.BASE_URL}/api/client/song/getsongbyslug?slug=${slug}`
  );

  const data = res.data;
  const req = await axios.post(
    `${process.env.BASE_URL}/api/client/song/addviewsong?id=${data._id}`
  );

  // Pass data to the page via props
  return {
    props: { data },
  };
}

// // pages/blog/[slug].js
// export async function getStaticPaths(context) {
//   const response = await axios.get(
//     `${process.env.BASE_URL}/api/client/song/getallslugsong`
//   );
//   const paths = response.data.map((song) => ({
//     params: {
//       singerslug: `${song.singerSlug}`,
//       songslug: `${song.slug}`,
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const slug = context.params.songslug;
//   // Fetch data from external API
//   const res = await axios.get(
//     `${process.env.BASE_URL}/api/client/song/getsongbyslug?slug=${slug}`
//   );

//   const data = res.data;
//   const req = await axios.post(
//     `${process.env.BASE_URL}/api/client/song/addviewsong?id=${data._id}`
//   );
//   console.log(req);
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }

export default SongSlug;
