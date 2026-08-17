import { useState } from 'react'

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      if (res.ok) {
        setTitle('')
        setContent('')
        onPostCreated()
      }
    } catch (err) {
      console.error('Error al crear post:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-10">
      <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-5">Nueva publicación</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-display text-white placeholder-neutral-600 outline-none bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:border-emerald-500 transition-colors"
        />
      </div>
      <div className="mb-5">
        <textarea
          placeholder="Escribe tu historia..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full text-base text-neutral-300 placeholder-neutral-600 outline-none bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 resize-none leading-relaxed focus:border-emerald-500 transition-colors"
        />
      </div>
      <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-500 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-400 disabled:opacity-30 transition-colors cursor-pointer"
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  )
}
