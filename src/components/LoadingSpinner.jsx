export default function LoadingSpinner() {
  return (
    <div
      style={{
        width: '60px',
        height: '60px',
        border: '6px solid white',
        borderTop: '6px solid rgba(255,255,255,0.3)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '20px auto'
      }}
    />
  )
}
