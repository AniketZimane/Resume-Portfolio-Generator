import React from 'react';
import { FaCheck } from 'react-icons/fa';

// Template preview images (base64 encoded placeholders for now)
const templatePreviews = {
  modern: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjM0I4MkY2Ii8+PHJlY3QgeT0iODAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzIwIiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMjAiIGZpbGw9IiNmZmZmZmYiLz48cmVjdCB4PSIxMDAiIHk9IjMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmZmZmIi8+PHJlY3QgeD0iMTAwIiB5PSI1MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIi8+PHJlY3QgeD0iMjAiIHk9IjEwMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzNiODJmNiIvPjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIwIiB5PSIxMzUiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIwIiB5PSIxNTAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIwIiB5PSIxODAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMTAiIGZpbGw9IiMzYjgyZjYiLz48cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMjE1IiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMjMwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48L3N2Zz4=',
  classic: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMDAwMCI+Sm9obiBEb2U8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSI2MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIj5Tb2Z0d2FyZSBEZXZlbG9wZXI8L3RleHQ+PGxpbmUgeDE9IjIwIiB5MT0iODAiIHgyPSIyODAiIHkyPSI4MCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48dGV4dCB4PSIyMCIgeT0iMTEwIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAwMDAwIj5FeHBlcmllbmNlPC90ZXh0PjxsaW5lIHgxPSIyMCIgeTE9IjEyMCIgeDI9IjI4MCIgeTI9IjEyMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIyMCIgeT0iMTMwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMTQ1IiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMTYwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48dGV4dCB4PSIyMCIgeT0iMjAwIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAwMDAwIj5FZHVjYXRpb248L3RleHQ+PGxpbmUgeDE9IjIwIiB5MT0iMjEwIiB4Mj0iMjgwIiB5Mj0iMjEwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjIwIiB5PSIyMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIwIiB5PSIyMzUiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjwvc3ZnPg==',
  creative: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOEI1Q0Y2OyIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzQjgyRjY7IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGNpcmNsZSBjeD0iMjgwIiBjeT0iMjAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iODAiIHI9IjIwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxyZWN0IHk9IjEwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmZmZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjEwMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiI+Sm9obiBEb2U8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSI3MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmZmZmYiPkRlc2lnbmVyICYgRGV2ZWxvcGVyPC90ZXh0PjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMTAiIGZpbGw9IiM4QjVDRjYiLz48cmVjdCB4PSIyMCIgeT0iMTQwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMTU1IiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMTcwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjUiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMCIgeT0iMjAwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjOEI1Q0Y2Ii8+PHJlY3QgeD0iMjAiIHk9IjIyMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI1IiBmaWxsPSIjNjQ3NDhiIi8+PHJlY3QgeD0iMjAiIHk9IjIzNSIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI1IiBmaWxsPSIjNjQ3NDhiIi8+PC9zdmc+',
  professional: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMUYyOTM3Ii8+PHJlY3QgeT0iODAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzIwIiBmaWxsPSIjZmZmZmZmIi8+PHRleHQgeD0iMjAiIHk9IjQwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmZmZmYiPkpvaG4gRG9lPC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSI2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmZmZmYiPlNvZnR3YXJlIEVuZ2luZWVyPC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFGMjkzNyI+UHJvZmVzc2lvbmFsIFN1bW1hcnk8L3RleHQ+PGxpbmUgeDE9IjIwIiB5MT0iMTIwIiB4Mj0iMjgwIiB5Mj0iMTIwIiBzdHJva2U9IiMxRjI5MzciIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjIwIiB5PSIxMzAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIwIiB5PSIxNDUiIHdpZHRoPSIyNjAiIGhlaWdodD0iNSIgZmlsbD0iIzY0NzQ4YiIvPjx0ZXh0IHg9IjIwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFGMjkzNyI+RXhwZXJpZW5jZTwvdGV4dD48bGluZSB4MT0iMjAiIHkxPSIxOTAiIHgyPSIyODAiIHkyPSIxOTAiIHN0cm9rZT0iIzFGMjkzNyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iMjAiIHk9IjIwMCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI1IiBmaWxsPSIjNjQ3NDhiIi8+PHJlY3QgeD0iMjAiIHk9IjIxNSIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI1IiBmaWxsPSIjNjQ3NDhiIi8+PC9zdmc+',
  minimal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwMDAwIj5KT0hOIERPRTwvdGV4dD48dGV4dCB4PSIxNTAiIHk9IjYwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4YiI+U29mdHdhcmUgRGV2ZWxvcGVyPC90ZXh0Pjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0NzQ4YiI+RVhQRVJJRU5DRTwvdGV4dD48cmVjdCB4PSI2MCIgeT0iMTIwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI2MCIgeT0iMTQwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI2MCIgeT0iMTU1IiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMiIGZpbGw9IiNlNWU3ZWIiLz48dGV4dCB4PSIxNTAiIHk9IjE5MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OGIiPkVEVUNBVElPTjwvdGV4dD48cmVjdCB4PSI2MCIgeT0iMjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI2MCIgeT0iMjMwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSI2MCIgeT0iMjQ1IiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjMiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4='
};

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A clean, contemporary design with a colored header and modern typography.',
      image: templatePreviews.modern
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'A traditional resume layout with a timeless, professional appearance.',
      image: templatePreviews.classic
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A vibrant, eye-catching design for creative professionals.',
      image: templatePreviews.creative
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'A sophisticated, business-oriented layout for corporate environments.',
      image: templatePreviews.professional
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A simple, elegant design focusing on content with minimal styling.',
      image: templatePreviews.minimal
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <p className="text-gray-600 mb-6">
        Select a template that best represents your professional style. You can change this anytime.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-primary ring-2 ring-primary ring-opacity-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {template.image ? (
                <img
                  src={template.image}
                  alt={`${template.name} template`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="block mt-2">{template.name} Preview</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{template.name}</h3>
                {selectedTemplate === template.id && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <FaCheck className="mr-1" size={10} /> Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;