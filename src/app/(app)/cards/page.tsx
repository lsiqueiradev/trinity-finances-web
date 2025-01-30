import { SummaryBox } from '@/components/summary-box'

export default function CardsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cartões de crédito</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryBox
          label="O melhor cartão para compra"
          value="Itaú Black"
          icon="CreditCard"
        />
        <SummaryBox
          label="Limite disponível"
          value="R$ 18.867,11"
          icon="WalletCards"
        />
        <SummaryBox label="Valor total" value="R$ 1.404,50" icon="Banknote" />
      </div>
    </div>
  )
}
