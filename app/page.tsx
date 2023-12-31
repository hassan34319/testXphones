import { NextPage } from "next";
import Carousel from "./components/Carousel";
import Categories2 from "./components/Categories2";
import Values from "./components/Values";
import Categories from "./components/Categories";
import Layout from "./components/Layout";
import { product } from "./utils/types";
import { sanityClient } from "../lib/sanityClient";
import SubscribeCard from "./components/SubscribeCard";
import Post from "./components/Post";
import getCurrentUser from "./utils/getCurrentUser";

type Props = {};

async function Home({}: Props) {
  const phonesQuery = '*[_type == "product" && category == "smartphone"]';
  const televisionsQuery = '*[_type == "product" && category == "television"]';
  const tabletsQuery = '*[_type == "product" && category == "tablet"]';
  const computersQuery = '*[_type == "product" && category == "computer"]';
  const bannerQuery = `*[_type == "banner"]`;
  const exclusiveQuery = `*[_type == 'product' && defined(priority)] | order(priority asc)`
  const banners = await sanityClient.fetch(bannerQuery);
  console.log(banners);
  const phones: product[] = await sanityClient.fetch(phonesQuery);
  const televisions: product[] = await sanityClient.fetch(televisionsQuery);
  const tablets: product[] = await sanityClient.fetch(tabletsQuery);
  const computers: product[] = await sanityClient.fetch(computersQuery);
  const exclusive: product[] = await sanityClient.fetch(exclusiveQuery);
  const query = `*[_type == 'publication'] {
    _id,
    title,
    content,
    images,
    video,
    likes,
    comments,
    _createdAt
  }`;
  const publications = await sanityClient.fetch(query);
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full mb-10">
      <Carousel Banners={banners} />
      <h1 className="text-xl md:text-3xl text-center my-4">
        « La meilleure boutique d&apos;électronique de Paris, rien de plus, rien
        de moins... »
      </h1>
      <h2 className="text-slate-800 text-center text-base md:text-2xl">
        Marie S.
      </h2>
      <div className="flex flex-col">
        <Categories2
          phones={phones}
          televisions={televisions}
          tablets={tablets}
          computers={computers}
          exclusive={exclusive}
        />
        <Categories />
      </div>
      <Post publications={publications} currentUser={currentUser} />
      <SubscribeCard />
      <Values />
    </div>
  );
}

export default Home;
