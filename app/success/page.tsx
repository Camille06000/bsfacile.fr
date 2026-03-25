import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Paiement confirmé !
        </h1>
        <p className="text-gray-500 mb-8">
          Votre accès à vie à BS Facile est activé. Vous pouvez maintenant générer
          des bulletins de salaire illimités.
        </p>
        <Link href="/generateur"
          className="block w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg py-4 rounded-xl transition-colors">
          Accéder au générateur →
        </Link>
        <p className="text-xs text-gray-400 mt-4">
          Un email de confirmation vous a été envoyé par SumUp.
        </p>
      </div>
    </div>
  );
}
