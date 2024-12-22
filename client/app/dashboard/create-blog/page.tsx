"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";

interface BlogsSent {
  title: string;
  description: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  userId: string;
}
interface Blogs {
  title: string;
  description: string;
  content: string;
  status: "PUBLISHED" | "DRAFT";
}
interface User {
  id: string;
  username: string;
  email: string;
}

const CreateBlog = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState<Blogs>({
    title: "",
    description: "",
    content: "",
    status: "DRAFT",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      if (!blogData.title.trim()) {
        throw new Error("Title is required");
      }
      if (!blogData.content.trim()) {
        throw new Error("Content is required");
      }

      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace("Bearer ", "")}`,
        },
        body: JSON.stringify({
          ...blogData,
          description: blogData.description || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create blog:", error);
      alert(error.message || "Failed to create blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
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

        <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800">
          <CardHeader className="flex flex-col gap-2 items-start px-8 pt-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Create New Blog
            </h1>
            <p className="text-zinc-400">
              Share your shity fucking thought with the world
            </p>
          </CardHeader>
          <Divider className="my-4" />
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                placeholder="Enter your blog title"
                variant="bordered"
                labelPlacement="outside"
                value={blogData.title}
                onChange={(e) =>
                  setBlogData({ ...blogData, title: e.target.value })
                }
                classNames={{
                  input: "bg-transparent",
                  label: "text-zinc-400",
                }}
              />

              <Textarea
                label="Description"
                placeholder="Brief description of your blog"
                variant="bordered"
                labelPlacement="outside"
                value={blogData.description}
                onChange={(e) =>
                  setBlogData({ ...blogData, description: e.target.value })
                }
                classNames={{
                  input: "bg-transparent",
                  label: "text-zinc-400",
                }}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">
                  Content
                </label>
                <RichTextEditor
                  content={blogData.content}
                  onChange={(newContent) =>
                    setBlogData({ ...blogData, content: newContent })
                  }
                />
              </div>

              <Select
                label="Status"
                placeholder="Select status"
                variant="bordered"
                labelPlacement="outside"
                defaultSelectedKeys={["DRAFT"]}
                onChange={(e) =>
                  setBlogData({
                    ...blogData,
                    status: e.target.value.toUpperCase() as
                      | "PUBLISHED"
                      | "DRAFT",
                  })
                }
                classNames={{
                  label: "text-zinc-400 my-2",
                }}
              >
                <SelectItem key="DRAFT" value="DRAFT">
                  Save as Draft
                </SelectItem>
                <SelectItem key="PUBLISHED" value="PUBLISHED">
                  Publish Now
                </SelectItem>
              </Select>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  as={Link}
                  href="/dashboard"
                  variant="flat"
                  color="danger"
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="shadow"
                  startContent={<FiSave />}
                  isLoading={isLoading}
                  className="font-medium"
                >
                  {isLoading ? "Saving..." : "Save Blog"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default CreateBlog;
