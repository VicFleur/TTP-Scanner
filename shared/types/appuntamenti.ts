export interface DateAppuntamento {
    id: string
    appuntamento: {
        nome: string
    }
    data: string
    prenotazioni_appuntamenti?: {
        prenotazioni_appuntamenti_posti: PrenotazioniAppuntamentiPosti[]
    }[]
}

export interface PrenotazioniAppuntamentiPosti {
    id: string
    status: 'issued' | 'scanned' | 'revoked'
    annullato: boolean
}