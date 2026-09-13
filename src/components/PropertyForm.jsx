import { useState } from 'react'

// 物件の新規登録・編集の両方で使うフォーム
// initialValuesが渡された場合は編集モードとして扱う
function PropertyForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isEditMode = Boolean(initialValues)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await onSubmit({ name, rent: Number(rent), area, layout })

      if (!isEditMode) {
        // 新規登録の場合は入力欄をリセットする
        setName('')
        setRent('')
        setArea('')
        setLayout('')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label>
        物件名
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        家賃（円）
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          min="0"
          required
        />
      </label>
      <label>
        エリア名
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
      </label>
      <label>
        間取り
        <input
          type="text"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          placeholder="例: 1LDK"
          required
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}

export default PropertyForm
