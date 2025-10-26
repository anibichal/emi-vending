import PropTypes from 'prop-types'

export default function Button({ text, onClick, className }) {
  return (
    <button className={`app-button ${className ?? ''}`} onClick={onClick}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}


