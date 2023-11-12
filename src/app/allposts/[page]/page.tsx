import PageNation from "@/app/components/PageNation";
import ArticleList from "../../components/ArticleList";
import { createMetaData } from "@/utils/metaData";
import { getAllPosts } from "@/lib/notion";

const BlogPageList = async ({ params }: { params: { page: number } }) => {
  const posts = await getAllPosts();
  const numberOfPage = Math.floor(posts.length / 6) + (posts.length % 6 > 0 ? 1 : 0);
  const currentPage: number = params?.page;
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const postsByPage = posts.slice(startIndex, endIndex);

  const metaData = createMetaData(postsByPage);

  return (
    <div className="h-auto xl:mx-40">
      <section className="w-full items-center px-3 ">
        <div className="text-center my-7">
          <h1 className="text-5xl font-PlayFairDisplay">All Posts</h1>
        </div>
        <ArticleList articles={metaData} normal={false} />
      </section>
      <PageNation numberOfPage={numberOfPage} tag={null} currentPage={currentPage} />
    </div>
  );
};

export default BlogPageList;
