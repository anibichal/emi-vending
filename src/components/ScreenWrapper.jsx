import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ScreenWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="screen-wrapper"
    >
      {children}
    </motion.div>
  )
}

ScreenWrapper.propTypes = { children: PropTypes.node.isRequired }




