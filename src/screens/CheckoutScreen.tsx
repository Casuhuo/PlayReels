import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, Smartphone, CreditCard, ArrowRight } from 'lucide-react';
import { CheckoutItem } from '../types';

interface CheckoutScreenProps {
  item: CheckoutItem;
  onBack: () => void;
  onPaymentSuccess: (item: CheckoutItem) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  item,
  onBack,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'card'>('mpesa');
  const [phone, setPhone] = useState('84 123 4567');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate mobile money push notification or card processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 1500);
  };

  const handleContinueAfterSuccess = () => {
    onPaymentSuccess(item);
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#131316]/90 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={isProcessing}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-zinc-300 font-display">Finalizar Compra</span>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Form */}
      <main className="flex-1 px-4 py-3 space-y-4">
        {/* Order Summary Card */}
        <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Item Selecionado
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
              <p className="text-xs text-zinc-400">{item.details}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-white font-mono">{item.priceMT} MT</span>
              <span className="block text-[10px] text-emerald-400 font-semibold">Tudo incluído</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 text-xs text-zinc-300">
            <span>Taxa de processamento</span>
            <span className="text-emerald-400 font-bold">0,00 MT (Grátis)</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-display">
            Forma de Pagamento
          </h3>

          <div className="space-y-2">
            {/* M-Pesa */}
            <div
              onClick={() => setPaymentMethod('mpesa')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition active:scale-[0.99] ${
                paymentMethod === 'mpesa'
                  ? 'bg-[#222228] border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'bg-[#1b1b1e] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">M-Pesa (Vodacom)</p>
                  <p className="text-[10px] text-zinc-400">Receba a notificação no seu telemóvel</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'mpesa' ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'
                }`}
              >
                {paymentMethod === 'mpesa' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>
            </div>

            {/* e-Mola */}
            <div
              onClick={() => setPaymentMethod('emola')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition active:scale-[0.99] ${
                paymentMethod === 'emola'
                  ? 'bg-[#222228] border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.2)]'
                  : 'bg-[#1b1b1e] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">e-Mola (Movitel)</p>
                  <p className="text-[10px] text-zinc-400">Débito direto via conta móvel</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'emola' ? 'border-orange-500 bg-orange-500' : 'border-zinc-600'
                }`}
              >
                {paymentMethod === 'emola' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>
            </div>

            {/* Cartão */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition active:scale-[0.99] ${
                paymentMethod === 'card'
                  ? 'bg-[#222228] border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                  : 'bg-[#1b1b1e] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Cartão de Crédito / Débito</p>
                  <p className="text-[10px] text-zinc-400">Visa, Mastercard, Internacional</p>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                }`}
              >
                {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Fields based on method */}
        <form onSubmit={handlePay} className="space-y-3 pt-1">
          {paymentMethod === 'mpesa' || paymentMethod === 'emola' ? (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pl-1" htmlFor="checkout-phone">
                Número de Telemóvel ({paymentMethod === 'mpesa' ? 'Vodacom' : 'Movitel'})
              </label>
              <div className="relative flex items-center rounded-xl bg-[#1b1b1e] border border-white/10 focus-within:border-[#e50914] transition">
                <span className="pl-3.5 pr-2 text-xs font-bold text-zinc-400">+258</span>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="84 XXX XXXX"
                  className="w-full bg-transparent py-3 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[10px] text-zinc-500 pl-1">
                Uma notificação com o pedido de confirmação de PIN será enviada para este número.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pl-1" htmlFor="checkout-card">
                Dados do Cartão
              </label>
              <div className="relative flex items-center rounded-xl bg-[#1b1b1e] border border-white/10 focus-within:border-[#e50914] transition">
                <CreditCard className="absolute left-3.5 text-zinc-400 w-4 h-4" />
                <input
                  id="checkout-card"
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Número do cartão"
                  className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none font-mono"
                />
              </div>
            </div>
          )}

          {/* Pay Button */}
          <button
            id="checkout-pay-btn"
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-[0.98] transition flex items-center justify-center gap-2 mt-4"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Confirmando transação no operador...</span>
              </div>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pagar Agora • {item.priceMT} MT</span>
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 py-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encriptação ponta a ponta de 256 bits</span>
        </div>
      </main>

      {/* Success Modal Overlay */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-[#1b1b1e] border border-white/15 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center">
            {/* Celebration Icon */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>

            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              Sucesso • Transação Aprovada
            </span>

            <h2 className="text-xl font-extrabold text-white font-display">
              Pagamento Confirmado!
            </h2>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              O seu pedido de <strong className="text-white">{item.title}</strong> foi processado com sucesso.
            </p>

            <div className="w-full my-4 p-3 rounded-xl bg-[#232328] border border-white/5 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Valor pago:</span>
                <span className="text-white font-bold font-mono">{item.priceMT} MT</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Método:</span>
                <span className="text-zinc-200 uppercase font-semibold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estado:</span>
                <span className="text-emerald-400 font-bold">Ativo Imediatamente</span>
              </div>
            </div>

            {/* Continuar -> Volta */}
            <button
              id="checkout-continue-btn"
              onClick={handleContinueAfterSuccess}
              className="w-full py-3.5 rounded-xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-sm tracking-wide shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
