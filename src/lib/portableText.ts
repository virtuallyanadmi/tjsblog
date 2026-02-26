import { toHTML } from '@portabletext/to-html';
import { urlFor } from './sanity';
import type { PortableTextBlock } from '@portabletext/types';

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: any; alt?: string; caption?: string } }) => {
      const imageUrl = urlFor(value.asset).width(800).url();
      return `
        <figure class="my-8">
          <img 
            src="${imageUrl}" 
            alt="${value.alt || ''}" 
            class="rounded-lg w-full"
            loading="lazy"
          />
          ${value.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${value.caption}</figcaption>` : ''}
        </figure>
      `;
    },
    code: ({ value }: { value: { code: string; language?: string } }) => {
      return `
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code class="language-${value.language || 'text'}">${escapeHtml(value.code)}</code>
        </pre>
      `;
    },
  },
  marks: {
    link: ({ children, value }: { children: string; value: { href: string } }) => {
      return `<a href="${value.href}" class="text-primary-600 hover:text-primary-800 underline" target="_blank" rel="noopener noreferrer">${children}</a>`;
    },
    code: ({ children }: { children: string }) => {
      return `<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">${children}</code>`;
    },
  },
  block: {
    h2: ({ children }: { children: string }) => 
      `<h2 class="text-3xl font-bold mt-10 mb-4 text-gray-900">${children}</h2>`,
    h3: ({ children }: { children: string }) => 
      `<h3 class="text-2xl font-bold mt-8 mb-3 text-gray-900">${children}</h3>`,
    h4: ({ children }: { children: string }) => 
      `<h4 class="text-xl font-semibold mt-6 mb-2 text-gray-900">${children}</h4>`,
    normal: ({ children }: { children: string }) => 
      `<p class="mb-4 text-gray-700 leading-relaxed">${children}</p>`,
    blockquote: ({ children }: { children: string }) => 
      `<blockquote class="border-l-4 border-primary-500 pl-4 my-6 italic text-gray-600">${children}</blockquote>`,
  },
  list: {
    bullet: ({ children }: { children: string }) => 
      `<ul class="list-disc list-inside mb-4 space-y-2 text-gray-700">${children}</ul>`,
    number: ({ children }: { children: string }) => 
      `<ol class="list-decimal list-inside mb-4 space-y-2 text-gray-700">${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }: { children: string }) => `<li>${children}</li>`,
    number: ({ children }: { children: string }) => `<li>${children}</li>`,
  },
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function renderPortableText(content: PortableTextBlock[]): string {
  if (!content) return '';
  return toHTML(content, { components: portableTextComponents as any });
}
