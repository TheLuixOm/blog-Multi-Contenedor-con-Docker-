import { useState, useEffect } from 'react'
import PostForm from './components/PostForm'
import PostList from './components/PostList'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error('Error al obtener posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-5 py-8 flex items-end justify-between">
          <h1 className="font-display text-4xl text-white tracking-tight">Blog</h1>
          <span className="text-xs text-neutral-500 uppercase tracking-widest pb-1">Multi-Contenedor</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-12">
        <PostForm onPostCreated={fetchPosts} />

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-5 h-5 border-2 border-neutral-700 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </div>
  )
}

export default App
