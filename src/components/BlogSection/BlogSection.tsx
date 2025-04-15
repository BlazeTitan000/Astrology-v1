import React from 'react';
import { Card, CardContent } from "../ui/card";

const blogPosts = [
  {
    id: 1,
    image: "/img.png",
    title: "Understanding Mercury Retrograde",
    description: "Discover how this celestial event affects communication and technology.",
    category: "Planetary Movements",
    date: "March 15, 2025"
  },
  {
    id: 2,
    image: "/img-1.png",
    title: "Full Moon Rituals",
    description: "Learn about powerful practices to harness lunar energy.",
    category: "Lunar Cycles",
    date: "March 12, 2025"
  },
  {
    id: 3,
    image: "/img-2.png",
    title: "The 12 Houses Explained",
    description: "Your complete guide to understanding astrological houses.",
    category: "Astrology Basics",
    date: "March 10, 2025"
  }
];

export const BlogSection = () => {
  return (
    <section className="w-full bg-[#161630] py-20">
      <div className="w-5/6 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-normal text-white leading-9 [font-family:'Montserrat',Helvetica] mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-gray-400 text-lg [font-family:'Montserrat',Helvetica]">
            Explore the latest insights from the world of astrology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-[#1c1c3a] rounded-xl overflow-hidden border-0 hover:transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-gray-400 text-sm mb-2">{post.date}</div>
                <h3 className="text-xl font-normal text-white leading-tight [font-family:'Montserrat',Helvetica] mb-4">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {post.description}
                </p>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};