"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";

interface Blog {
  id: string;
  title: string;
  description?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: "DRAFT" | "PUBLISHED";
}

export default function Dashboard() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:3000/blogs/recent", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecentBlogs(data);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Cool ass name
          </h1>
          <Button
            color="primary"
            variant="shadow"
            startContent={<FiPlus />}
            size="lg"
            as={Link}
            href="/dashboard/create-blog"
          >
            Create New Blog
          </Button>
        </div>

        <Divider className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800">
            <CardBody>
              <p className="text-zinc-400">Total Blogs</p>
              <h3 className="text-3xl font-bold">12</h3>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800">
            <CardBody>
              <p className="text-zinc-400">Published</p>
              <h3 className="text-3xl font-bold">8</h3>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800">
            <CardBody>
              <p className="text-zinc-400">Drafts</p>
              <h3 className="text-3xl font-bold">4</h3>
            </CardBody>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Blogs</h2>
            <Link href="/dashboard/blogs" color="primary">
              View All
            </Link>
          </CardHeader>
          <Divider />
          <CardBody>
            <Table aria-label="Recent blogs table">
              <TableHeader>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {recentBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          blog.status === "PUBLISHED"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
