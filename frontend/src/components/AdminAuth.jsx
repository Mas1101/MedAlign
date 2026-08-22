import Auth from './Auth';

function AdminAuth({ onSuccess, onBack }) {
  return (
    <Auth
      onSuccess={onSuccess}
      onBack={onBack}
      defaultRole="admin"
      lockRole={true}
    />
  );
}

export default AdminAuth;
