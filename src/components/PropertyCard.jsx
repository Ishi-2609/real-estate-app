import { useState } from 'react'
import PropertyForm from './PropertyForm'

// 物件1件分の表示と、編集モードへの切り替え・削除を担う
function PropertyCard({ property, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleUpdate = async (values) => {
    await onUpdate(property.id, values)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!window.confirm('この物件を削除しますか？')) return

    setError('')
    setDeleting(true)
    try {
      await onDelete(property.id)
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (isEditing) {
    return (
      <div className="property-card">
        <PropertyForm
          initialValues={property}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitLabel="保存"
        />
      </div>
    )
  }

  return (
    <div className="property-card">
      <h2 className="property-name">{property.name}</h2>
      <p className="property-rent">{property.rent.toLocaleString()}円 / 月</p>
      <p className="property-area">{property.area}</p>
      <p className="property-layout">{property.layout}</p>
      {error && <p className="error-message">{error}</p>}
      <div className="property-card-actions">
        <button type="button" onClick={() => setIsEditing(true)}>
          編集
        </button>
        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? '削除中...' : '削除'}
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
