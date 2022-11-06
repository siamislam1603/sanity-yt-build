import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner/Banner";
import Header from "../components/Header/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      {/* Posts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-3 md:p-6 sm:gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            className="border rounded-lg group overflow-hidden cursor-pointer"
            href={`/post/${post.slug.current}`}
          >
            <img
              className="h-60 object-cover w-full rounded-t-lg group-hover:scale-105"
              src={urlFor(post.mainImage).url()}
              alt=""
            />
            <div className="flex justify-between p-3">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-xs text-gray-500">
                  {post.description} by {post.author.name}
                </p>
              </div>
              <img src={urlFor(post.author.image).url()} alt="" className="w-6 h-6 rounded object-cover" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  //Fetch all posts from post selecting these fields
  const query = `*[_type=='post']{
    _id,
    title,
    description,
    author->{
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
