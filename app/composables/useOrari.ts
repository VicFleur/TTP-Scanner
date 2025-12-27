export const useOrari = () => {
    const formatoDataOraLungo = (date: Date) => {
        if (!isNaN(date.getTime())) return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        else return null
    }

    return { formatoDataOraLungo }
}