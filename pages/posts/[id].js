// import Image from "next/image";
import Head from "next/head";

import axios from "axios";

export default function Post({ post }) {
  return (
    <div className="max-w-screen-xl mx-auto px-2 py-4">
      <Head>
        <title>Post</title>
        <meta name="description" content="Efreshli single post!" />
      </Head>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-lg leading-5 text-gray-900 font-semibold">
          {post?.text}
        </h3>
        <div>
          <img className="w-96 object-cover" src={post?.image} loading="lazy" />
          {/* <Image
            src={post.image}
            height={500}
            width={350}
            className="object-cover"
            alt="Post Image"
          /> */}
        </div>
        <ul className="flex flex-wrap gap-1">
          {post?.tags?.map((tag) => (
            <li key={tag} className="text-sm text-gray-500 font-medium">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get(
    "https://dummyapi.io/data/v1/post?limit=50",
    {
      headers: {
        "app-id": "6218366d0fae218d66ef3b0b",
      },
    }
  );
  return {
    paths: data.data.map((post) => ({
      params: { id: post.id },
    })),

    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { data } = await axios.get(
    `https://dummyapi.io/data/v1/post/${context.params.id}`,
    {
      headers: {
        "app-id": "6218366d0fae218d66ef3b0b",
      },
    }
  );
  return {
    props: {
      post: data,
    },
  };
}
