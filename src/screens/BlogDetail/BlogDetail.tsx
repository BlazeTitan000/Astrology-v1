import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

// This would typically come from an API or database
const blogPosts = [
    {
        id: 1,
        image: "/img.png",
        title: "Understanding Mercury Retrograde",
        description: "Discover how this celestial event affects communication and technology.",
        category: "Planetary Movements",
        date: "March 15, 2025",
        content: `
      Mercury retrograde is a phenomenon that occurs when the planet Mercury appears to move backward in its orbit. 
      This optical illusion happens three to four times a year and is often associated with communication breakdowns, 
      technology glitches, and travel delays.

      During this period, it's advisable to:
      - Double-check all communications
      - Back up important data
      - Avoid signing important contracts
      - Be extra careful with travel plans

      While Mercury retrograde can be challenging, it's also an excellent time for reflection and revisiting past projects.
    `
    },
    {
        id: 2,
        image: "/img-1.png",
        title: "Full Moon Rituals",
        description: "Learn about powerful practices to harness lunar energy.",
        category: "Lunar Cycles",
        date: "March 12, 2025",
        content: `
      The full moon is a powerful time for manifestation and release. Here are some rituals you can practice:

      1. Moon Bathing: Spend time under the moonlight, absorbing its energy
      2. Journaling: Write down what you want to release and manifest
      3. Crystal Charging: Place your crystals under the moonlight
      4. Meditation: Connect with the moon's energy through guided meditation

      Remember to set your intentions clearly and trust in the process.
    `
    },
    {
        id: 3,
        image: "/img-2.png",
        title: "The 12 Houses Explained",
        description: "Your complete guide to understanding astrological houses.",
        category: "Astrology Basics",
        date: "March 10, 2025",
        content: `
      The 12 houses in astrology represent different areas of life. Here's a brief overview:

      1. First House: Self, appearance, and first impressions
      2. Second House: Values, possessions, and resources
      3. Third House: Communication, siblings, and short trips
      4. Fourth House: Home, family, and roots
      5. Fifth House: Creativity, romance, and children
      6. Sixth House: Health, service, and daily routines
      7. Seventh House: Partnerships and relationships
      8. Eighth House: Transformation and shared resources
      9. Ninth House: Philosophy, travel, and higher education
      10. Tenth House: Career and public image
      11. Eleventh House: Friendships and group activities
      12. Twelfth House: Spirituality and the subconscious

      Understanding these houses can provide deep insights into your life's different areas.
    `
    }
];

export const BlogDetail = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const post = blogPosts.find(post => post.id === Number(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-[#1C1C3A] text-white flex items-center justify-center">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1C1C3A]">
            <Header />
            <article className="pt-24 pb-16">
                <div className="w-5/6 mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <span className="text-gray-400 text-sm ml-4">{post.date}</span>
                        </div>

                        <h1 className="text-4xl font-normal text-white leading-tight font-libre-bodoni mb-8">
                            {post.title}
                        </h1>

                        <div className="relative mb-12">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-96 object-cover rounded-xl"
                            />
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 text-lg leading-relaxed font-playfair whitespace-pre-line">
                                {post.content}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 