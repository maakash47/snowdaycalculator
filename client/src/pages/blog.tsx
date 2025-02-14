import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";

export default function Blog() {
  const blogs = [
    {
      id: 1,
      title: "Understanding Snow Day Predictions",
      date: "February 13, 2025",
      excerpt: "Learn about the science behind snow day predictions and how various weather factors contribute to school closings.",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The History of Snow Days in American Education",
      date: "February 12, 2025",
      excerpt: "Explore the fascinating history of snow days in American schools and how technology has changed the decision-making process.",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8">
        Snow Day Blog
      </h1>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Link href={`/blog/${blog.id}`}>
                <a className="block">
                  <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                </a>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{blog.excerpt}</p>
              <Link href={`/blog/${blog.id}`}>
                <a className="inline-block mt-4 text-primary hover:underline">
                  Read more →
                </a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
