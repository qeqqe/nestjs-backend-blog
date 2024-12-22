"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { FiEdit3, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { Select, SelectItem } from "@nextui-org/select";

interface Blog {
  id: string;
  title: string;
  description: string;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
  userId: string;
  user: {
    username: string;
  };
}

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [myBlogsFilter, setMyBlogsFilter] = useState("all");

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // TODO: Fetch blogs from your API
    // For now using dummy data
    setBlogs([
      {
        id: "1",
        title: "Understanding NextJS 13",
        description: "A comprehensive guide to NextJS 13 features",
        status: "PUBLISHED",
        createdAt: "2024-01-22",
        userId: "user1",
        user: { username: "john_doe" },
      },
      {
        id: "2",
        title: "TypeScript Best Practices",
        description: "Learn TypeScript best practices",
        status: "DRAFT",
        createdAt: "2024-01-21",
        userId: "user2",
        user: { username: "jane_doe" },
      },
    ]);
  }, []);

  const filteredBlogs = () => {
    if (selectedTab === "all") {
      return blogs;
    }

    const userBlogs = blogs.filter((blog) => blog.userId === user?.id);

    switch (myBlogsFilter) {
      case "published":
        return userBlogs.filter((blog) => blog.status === "PUBLISHED");
      case "draft":
        return userBlogs.filter((blog) => blog.status === "DRAFT");
      default:
        return userBlogs;
    }
  };

  const renderBlogGrid = (blogsToRender: Blog[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogsToRender.map((blog) => (
        <Card
          key={blog.id}
          className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800"
        >
          <CardBody className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm text-zinc-400">
                    by {blog.user.username}
                  </p>
                </div>
                <Chip
                  size="sm"
                  variant="flat"
                  className={
                    blog.status === "PUBLISHED"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }
                >
                  {blog.status}
                </Chip>
              </div>
              <p className="text-zinc-300">{blog.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-zinc-400 hover:text-blue-500"
                  >
                    <FiEdit3 />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            as={Link}
            href="/dashboard"
            variant="light"
            startContent={<FiArrowLeft />}
            className="text-zinc-400 hover:text-white"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Blogs
            </h1>
            {selectedTab === "my" && (
              <Select
                size="sm"
                variant="bordered"
                placeholder="Filter posts"
                defaultSelectedKeys={["all"]}
                className="w-48"
                value={myBlogsFilter}
                onChange={(e) => setMyBlogsFilter(e.target.value)}
                classNames={{
                  trigger: "bg-zinc-800/50 border-zinc-700",
                  value: "text-zinc-200",
                }}
              >
                <SelectItem key="all" value="all">
                  All Posts
                </SelectItem>
                <SelectItem
                  key="published"
                  value="published"
                  startContent={
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  }
                >
                  Published Only
                </SelectItem>
                <SelectItem
                  key="draft"
                  value="draft"
                  startContent={
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  }
                >
                  Drafts Only
                </SelectItem>
              </Select>
            )}
          </div>

          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key.toString())}
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
          >
            <Tab key="all" title="All Blogs" />
            <Tab key="my" title="My Blogs" />
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs().length > 0 ? (
              renderBlogGrid(filteredBlogs())
            ) : (
              <Card className="bg-zinc-800/50 border border-zinc-700 col-span-2">
                <CardBody className="p-6">
                  <p className="text-zinc-400">
                    {selectedTab === "all"
                      ? "No blogs found"
                      : `No ${myBlogsFilter === "all" ? "" : myBlogsFilter} posts found`}
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
