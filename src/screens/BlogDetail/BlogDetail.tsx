import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';
import { blogPosts } from '../../data/blogContent';

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
                                className="w-full object-cover rounded-xl"
                            />
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <div className="text-gray-300 text-lg leading-relaxed font-playfair whitespace-pre-line">
                                {post.content.split('\n\n').map((paragraph, index) => {
                                    // Check if the paragraph starts with a bullet point
                                    if (paragraph.trim().startsWith('•')) {
                                        return (
                                            <ul key={index} className="list-none pl-0 my-4">
                                                {paragraph.split('\n').map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start mb-2">
                                                        <span className="text-purple-400 mr-2">•</span>
                                                        <span>{item.replace('•', '').trim()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    // Check if the paragraph is a heading (no bullet points and shorter)
                                    else if (paragraph.length < 100 && !paragraph.includes('•')) {
                                        return (
                                            <h2 key={index} className="text-2xl font-normal text-white leading-tight font-libre-bodoni mt-8 mb-4">
                                                {paragraph}
                                            </h2>
                                        );
                                    }
                                    // Regular paragraph
                                    return (
                                        <p key={index} className="mb-6">
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}; 