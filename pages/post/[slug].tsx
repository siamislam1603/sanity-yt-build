import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import Header from "../../components/Header/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}
const post = ({ post }: Props) => {
  console.log(post);
  return (
    <main>
      <Header></Header>
      <img
        src={urlFor(post.mainImage.asset).url()}
        alt=""
        className="w-full h-40 object-cover"
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm font-light text-gray-600">
            Blog posted by{" "}
            <span className="text-green-500">{post.author.name}</span> -{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-8">
          <PortableText
            content={post.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <hr className="max-w-lg mx-auto border-t-yellow-300 my-5"/>
        <h2 className="text-md font-semibold text-yellow-300">Enjoyed this article?</h2>
        <h1 className="text-2xl font-bold">Leave a comment below!</h1>
        <form className="mt-10">
            <label htmlFor="name" className="flex flex-col">
                Name
                <input type="text" id="name" placeholder="Enter your name" className="border rounded-lg py-2 px-3 outline-none focus:border-yellow-300 mt-1" />
            </label>
            <label htmlFor="email" className="flex flex-col mt-3">
                Email
                <input type="email" id="email" placeholder="your@email.com" className="border rounded-lg py-2 px-3 outline-none focus:border-yellow-300 mt-1" />
            </label>
            <label htmlFor="comment" className="flex flex-col mt-3">
                Comment
                <textarea id="comment" placeholder="Enter some long form content." className="border rounded-lg py-2 px-3 outline-none focus:border-yellow-300 mt-1" rows={8}>
                </textarea>
            </label>
            <button className="bg-yellow-300 text-white px-3 py-2 text-center w-full mt-10 rounded-md">Submit</button>
        </form>
      </article>
    </main>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type=='post']{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=='post' && slug.current==$slug][0]{
        _id,
        _createdAt,
        title,
        author->{
        name,image
      },
      body,
      description,
      mainImage,
      slug
      }
    `;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
export default post;
