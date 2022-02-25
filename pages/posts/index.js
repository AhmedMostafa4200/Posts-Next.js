import Link from "next/link";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";

import axios from "axios";

import { convertDate } from "../../utils.js/convertDate";

export default function Posts({ fetchedPosts, total }) {
  const [limit, setLimit] = useState(10);

  const [posts, setPosts] = useState(fetchedPosts);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const getPostsPaginated = async () => {
      const { data } = await axios.get(
        `https://dummyapi.io/data/v1/post?limit=${limit}`,
        {
          headers: {
            "app-id": "6218366d0fae218d66ef3b0b",
          },
        }
      );

      setPosts(() => data.data);
    };
    getPostsPaginated();
  }, [limit]);

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-4">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Efreshli posts!" />
      </Head>
      <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a className="flex flex-col gap-1 items-center flex-1 min-w-[256px] max-w-[256px]">
              <div>
                <img
                  className="w-64 h-44 object-cover"
                  src={post.image}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-lg leading-5 text-gray-900 font-semibold">
                  {post.text}
                </h3>
                <ul className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <li key={tag} className="text-sm text-gray-500 font-medium">
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 font-medium">
                  Puplished at:{" "}
                  <span className="text-gray-600">
                    {convertDate(post.publishDate)}
                  </span>
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="w-full text-center pt-8">
        <button
          className="bg-red-500 text-white text-base font-semibold py-2 px-12 sm:px-20 rounded-md disabled:cursor-not-allowed disabled:bg-opacity-50"
          onClick={() => setLimit((prevLimit) => prevLimit + 10)}
          disabled={limit >= 50}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    "https://dummyapi.io/data/v1/post?limit=10",
    {
      headers: {
        "app-id": "6218366d0fae218d66ef3b0b",
      },
    }
  );
  return {
    props: {
      fetchedPosts: data.data,
      total: data.total,
    },
  };
}
