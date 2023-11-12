import { notFound } from "next/navigation";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from "react";

export const revalidate = 60;


const notionSecret = process.env.NOTION_TOKEN!;
const notionDataBaseId = process.env.NOTION_DATABASE_ID!;

const notion = new Client({
  auth: notionSecret,
});

export const getAllPosts = cache(async () => {
  const posts = await notion.databases.query({
    database_id: notionDataBaseId,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allPosts = posts.results;
  return allPosts;
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPostDetail = cache(async (slug: string) => {
  const response = await notion.databases.query({
    database_id: notionDataBaseId,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page = response.results[0];
  if (!page) {
    notFound();
  }
  const mbBlocks = await n2m.pageToMarkdown(page.id);
  const mbString = n2m.toMarkdownString(mbBlocks);
  return {
    page,
    mbString,
  };
});

export const updateLikes = async (id: string) => {
  await notion.pages.update({
    page_id: id,
    properties: {
      Likes: {
        number: 4,
      },
    },
  });
};
