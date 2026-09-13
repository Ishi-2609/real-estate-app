import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import { useAuth } from '../contexts/AuthContext'
import {
  createProperty,
  deleteProperty,
  fetchProperties,
  updateProperty,
} from '../lib/propertiesApi'

function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProperties = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchProperties()
      setProperties(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreate = async (values) => {
    const created = await createProperty({ ...values, userId: user.id })
    setProperties((prev) => [created, ...prev])
  }

  const handleUpdate = async (id, values) => {
    const updated = await updateProperty(id, values)
    setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  const handleDelete = async (id) => {
    await deleteProperty(id)
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="properties-page">
      <header className="properties-header">
        <div>
          <h1>物件一覧</h1>
          <p className="logged-in-user">{user?.email} でログイン中</p>
        </div>
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      <section className="property-form-section">
        <h2>物件を登録</h2>
        <PropertyForm onSubmit={handleCreate} submitLabel="登録" />
      </section>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="status-message">読み込み中...</p>
      ) : properties.length === 0 ? (
        <p className="empty-message">登録されている物件はありません</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertiesPage
