interface BlogPreviewProps {
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
}

export function BlogPreview({ title, excerpt, date, readTime }: BlogPreviewProps) {
  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-xl font-serif font-semibold text-white mb-2">
        {title || 'Blog Post Title'}
      </h3>
      <p className="text-cream-100 text-sm mb-4">
        {excerpt || 'Blog post excerpt...'}
      </p>
      <div className="flex items-center text-xs text-cream-200">
        <span>{date || 'Date'}</span>
        {readTime && (
          <>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </>
        )}
      </div>
    </div>
  );
}