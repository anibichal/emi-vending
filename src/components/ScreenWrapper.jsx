import PropTypes from 'prop-types';

export default function ScreenWrapper({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
}

ScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};


