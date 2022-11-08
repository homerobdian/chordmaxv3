import React from "react";
import axios from "axios";
import SingerItem from "../../../components/front/SingerItem.js";
import { upperCase } from "upper-case";

const SingerByAbjad = (data) => {
  return (
    <>
      <div className="prose max-w-none prose-slate dark:prose-invert">
        <SingerItem data={data} />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const qer = context.query.singerbyabjad;
  const query = upperCase(qer);

  const response = await axios.get(
    `${process.env.BASE_URL}/api/client/singer/getsingerbyabjad?abjad=${query}`
  );

  const data = response.data;

  return { props: { data } };
}

export default SingerByAbjad;
