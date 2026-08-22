import Auth from './Auth';

function DoctorAuth({ onSuccess, onBack }) {
  return (
    <Auth
      onSuccess={onSuccess}
      onBack={onBack}
      defaultRole="doctor"
      lockRole={true}
    />
  );
}

export default DoctorAuth;
