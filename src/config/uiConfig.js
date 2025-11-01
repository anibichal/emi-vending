export const uiConfig = {
  prices: { 1: 700, 2: 1300, 3: 1900 },

  messages: {
    start: 'Toque el logo para comenzar',
    checkingStock: 'Verificando nivel de stock...',
    lowStock: 'Nivel de stock bajo, no podemos proceder con la venta',
    timeoutStockService : 'Servicio de stock no disponible',
    qty: '¿Cuántos litros desea cargar?',
    paySelection: litros => `Usted ha seleccionado ${litros} litro(s)`,
    paying: 'Siga las instrucciones en el pinpad',
    printing: 'Pago procesado, imprimiendo boleta...',
    fillInsert: 'Introduzca el bidón en la ranura',
    fillReady: 'Presione botón iniciar para comenzar el llenado',
    filling: 'Llenando...',
    thanks: 'Muchas gracias por utilizar EMI, vuelva pronto ;)',
    error: 'Ups!, algo ha salido mal. Favor vuelva a intentarlo.'
  },

  buttons: {
    start: 'Comenzar',
    pay: 'Pagar',
    startFill: 'Comenzar'
  },

  saleTimeoutMs: 3 * 60 * 1000 // 3 minutos
}


