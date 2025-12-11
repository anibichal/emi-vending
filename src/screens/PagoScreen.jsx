import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ScreenWrapper from '../components/ScreenWrapper.jsx'
import Button from '../components/Button.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { uiConfig } from '../config/uiConfig.js'
import { initPOS, doSale } from '../services/posService.js'
import { ImprimirBoleta } from '../services/mockServices.js'
import ButtonPay from '../components/ButtonPay.jsx'
import { Home } from 'lucide-react'  // 👈 icono


function getTicketCountForToday() {
  try {
    const raw = localStorage.getItem('ticketCounter')
    const today = new Date().toISOString().slice(0,10)
    if (!raw) {
      const newObj = { date: today, count: 1 }
      localStorage.setItem('ticketCounter', JSON.stringify(newObj))
      return newObj.count
    }
    const obj = JSON.parse(raw)
    if (!obj || obj.date !== today) {
      const newObj = { date: today, count: 1 }
      localStorage.setItem('ticketCounter', JSON.stringify(newObj))
      return newObj.count
    } else {
      obj.count = (obj.count || 0) + 1
      localStorage.setItem('ticketCounter', JSON.stringify(obj))
      return obj.count
    }
  } catch (err) {
    const fallback = { date: new Date().toISOString().slice(0,10), count: 1 }
    localStorage.setItem('ticketCounter', JSON.stringify(fallback))
    return fallback.count
  }
}

function formatDateForTicket(d = new Date()) {
  const dd = String(d.getDate()).padStart(2,'0')
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const yyyy = d.getFullYear()
  return `${dd}${mm}${yyyy}`
}
function formatTimeForTicket(d = new Date()) {
  const hh = String(d.getHours()).padStart(2,'0')
  const mi = String(d.getMinutes()).padStart(2,'0')
  const ss = String(d.getSeconds()).padStart(2,'0')
  return `${hh}${mi}${ss}`
}

export default function PagoScreen() {
  const { litros } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState('ready') // ready | waiting | printing
  const [initChecked, setInitChecked] = useState(false)


  useEffect(() => {
    let mounted = true
    ;(async () => {
      const r = await initPOS()
      if (!mounted) return
      setInitChecked(true)
      if (!r.ok) {
        console.error('Init POS failed:', r)
        navigate('/error')
      }
    })()
    return () => { mounted = false }
  }, [])

  const handlePay = async () => {
    setState('waiting')
    const price = uiConfig.prices[Number(litros)]
    const count = getTicketCountForToday()
    const ticket = `${formatDateForTicket()}${formatTimeForTicket()}${String(count).padStart(4,'0')}`

    const saleResult = await doSale(price, ticket, uiConfig.saleTimeoutMs) // VOLVER A ESTADO ANTERIOR AAB
    //const saleResult = await doSale(price, ticket, 3000) // volver a la normalidad este codigo
    if (!saleResult.ok) {
      console.error('Sale failed:', saleResult)
      navigate('/error')
      return
    }

    setState('printing')
    const printR = await ImprimirBoleta()
    if (printR === 'ok') {
      navigate(`/fill/${litros}`)
    } else {
      navigate('/error')
    }
   navigate(`/fill/${litros}`)
  }

  // if POS init hasn't completed yet, show a small spinner (avoid blank) ESTO LO CAMBIE ERA ASI if (!initChecked) AAB
  if ((!initChecked)) {
    return (
      <ScreenWrapper>
        <h1 className="screen-title">Inicializando terminal...</h1>
        <LoadingSpinner />
      </ScreenWrapper>
    )
  }

  return (
    <ScreenWrapper>
      {state === 'ready' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.paySelection(litros)}</h1>
          <div style={{ marginTop: 12 }}>
            <ButtonPay onClick={handlePay} />
          </div>
          <h1 className="screen-title">Total: ${uiConfig.prices[Number(litros)]}</h1>
        </>
      )}

      {state === 'waiting' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.paying}</h1>
          <LoadingSpinner />
        </>
      )}

      {state === 'printing' && (
        <>
          <h1 className="screen-title">{uiConfig.messages.printing}</h1>
          <LoadingSpinner />
        </>
      )}
            {/* 👇 Botón flotante de Home */}
      <button
        className="home-button"
        onClick={() => navigate('/')}
        aria-label="Ir a inicio"
      >
        <Home size={40} />
      </button>
    </ScreenWrapper>
  )
}

