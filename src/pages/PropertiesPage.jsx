import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { dummyProperties } from '../dummyProperties'

function PropertiesPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

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

      <div className="property-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2 className="property-name">{property.name}</h2>
            <p className="property-rent">
              {property.rent.toLocaleString()}円 / 月
            </p>
            <p className="property-area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertiesPage
