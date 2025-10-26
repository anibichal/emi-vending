export const uiConfig = {
  prices: { 1: 700, 2: 1300, 3: 1900 },

  messages: {
    start: 'Toque pantalla para comenzar',
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


