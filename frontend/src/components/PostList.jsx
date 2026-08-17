export default function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-neutral-900/50 border border-neutral-800/50 rounded-xl">
        <p className="text-neutral-600 text-lg">No hay entradas aún.</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {posts.map((post) => (
        <article
          key={post._id}
          className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6 group hover:border-neutral-700 transition-colors"
        >
          <h2 className="text-xl font-display text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors">{post.title}</h2>
          <p className="text-neutral-400 text-sm mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>
          <time className="text-xs text-neutral-600 uppercase tracking-widest">
            {new Date(post.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </article>
      ))}
    </div>
  )
}
