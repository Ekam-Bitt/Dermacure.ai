import React from 'react';

import Image from 'next/image';

interface TestimonyCardProps {
  imageSrc: string;
  title: string;
  content: string;
  author: string;
}

export default function TestimonyCard({
  imageSrc,
  title,
  content,
  author
}: TestimonyCardProps) {
  return (
    <div className="max-w-md py-4 px-8 m-4 h-[272px] bg-white rounded-xl border border-black">
      <div className="flex flex-row justify-between items-center">
        <Image
          src={imageSrc}
          alt={author}
          className="w-20 h-20 object-cover rounded-full"
        />
        <h2 className="text-gray-800 h-20 w-64 flex items-center text-2xl">
          {title}
        </h2>
      </div>
      <div>
        <p className="mt-8 h-[96px] text-gray-600">{content}</p>
      </div>
      <div className="flex justify-end">
        <a href="#" className="text-xl font-medium text-indigo-500">
          {author}
        </a>
      </div>
    </div>
  );
}
