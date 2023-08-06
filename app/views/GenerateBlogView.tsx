"use client";

import { GenerateBlogForm } from "@/components/GenerateBlogForm";
import { useState } from "react";

export default function GenerateBlogView() {
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateBlogPost = async (data: CreateBlogRequest) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create blog post.");
      }

      const blogData = await response.json();

      setIsLoading(false);
      setBlog(blogData.blog);

      // Optionally, you can do something with the blogData here
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Handle any error or show an error message to the user
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-white">
        <div className="ml-8 mr-8 mt-4 mb-4 text-xl">
          <h1>Blog Generator</h1>
        </div>
        <GenerateBlogForm handleCreateBlogPost={handleCreateBlogPost} />
      </div>

      <div className="w-2/3 bg-gray-200">
        <div className="h-full flex justify-center items-center">
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <h1>{blog?.title}</h1>
              {blog?.content}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
