export interface DateAppuntamento {
    id: string
    appuntamento: {
        nome: string
    }
    data: string
    prenotazioni_appuntamenti?: {
        prenotazioni_appuntamenti_posti: {
            annullato: boolean
        }
    }[]
}