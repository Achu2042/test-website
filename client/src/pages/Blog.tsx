import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight, TrendingUp, Home, Shield, Zap } from "lucide-react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = blogPosts?.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1, 4);
  const allPosts = filteredPosts.slice(4);

  const categories = [
    { name: "Smart Home", icon: Home, color: "bg-blue-100 text-blue-600" },
    { name: "Security", icon: Shield, color: "bg-red-100 text-red-600" },
    { name: "Energy", icon: Zap, color: "bg-green-100 text-green-600" },
    { name: "Trends", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
  ];

  const dummyPosts = [
    {
      id: "1",
      title: "10 Smart Home Trends to Watch in 2024",
      excerpt: "Discover the latest innovations in home automation technology that will shape the future of smart living.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      createdAt: "2024-01-15",
      published: true
    },
    {
      id: "2",
      title: "How Smart Security Systems Prevent Break-ins",
      excerpt: "Learn about the advanced features of modern security systems and how they protect your home 24/7.",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      createdAt: "2024-01-10",
      published: true
    },
    {
      id: "3",
      title: "Energy Savings with Smart Home Automation",
      excerpt: "Maximize your energy efficiency and reduce bills with intelligent automation systems.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      createdAt: "2024-01-05",
      published: true
    }
  ];

  const postsToShow = filteredPosts.length > 0 ? filteredPosts : dummyPosts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-blog-title">
            HEKATE AUTOMATION Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay updated with the latest insights, trends, and tips in smart home automation and security
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-blog-search"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Badge key={index} variant="outline" className={`${category.color} px-4 py-2 text-sm font-medium cursor-pointer hover:shadow-md transition-shadow`} data-testid={`badge-category-${index}`}>
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Badge>
          ))}
        </div>

        {postsToShow.length > 0 ? (
          <>
            {/* Featured Post */}
            {postsToShow[0] && (
              <Card className="overflow-hidden mb-12 hover:shadow-lg transition-shadow" data-testid="card-featured-post">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                    <img
                      src={postsToShow[0].imageUrl || "https://via.placeholder.com/800x400"}
                      alt={postsToShow[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      data-testid="img-featured-post"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-primary text-white">Featured Article</Badge>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-featured-title">
                      {postsToShow[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {postsToShow[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(postsToShow[0].createdAt).toLocaleDateString()}</span>
                      <User className="w-4 h-4 ml-4 mr-2" />
                      <span>HEKATE Team</span>
                    </div>
                    <Button className="w-fit bg-primary text-white hover:bg-blue-800" data-testid="button-read-featured">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Recent Posts Grid */}
            {postsToShow.slice(1).length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postsToShow.slice(1).map((post: any, index: number) => (
                    <Card key={post.id || index} className="overflow-hidden hover:shadow-lg transition-shadow group" data-testid={`card-recent-post-${index}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.imageUrl || "https://via.placeholder.com/400x200"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`img-recent-post-${index}`}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2" data-testid={`text-recent-title-${index}`}>
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3" data-testid={`text-recent-excerpt-${index}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className="text-primary font-medium">3 min read</span>
                        </div>
                        <Button variant="outline" className="w-full" data-testid={`button-read-recent-${index}`}>
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No articles found matching your search.</p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              data-testid="button-clear-search"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest smart home automation insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900"
                data-testid="input-newsletter-email"
              />
              <Button className="bg-white text-primary hover:bg-gray-100" data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-topic-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.name === "Smart Home" && "Latest automation technologies and innovations"}
                    {category.name === "Security" && "Home security tips and best practices"}
                    {category.name === "Energy" && "Energy efficiency and sustainability"}
                    {category.name === "Trends" && "Industry trends and future predictions"}
                  </p>
                  <Button variant="outline" size="sm" data-testid={`button-explore-topic-${index}`}>
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
