import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session  } = useSession();

  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe')

      console.log(response.data);

      const { sessionId } = response.data;

      const stripe = await getStripJs();

      await stripe.redirectToCheckout({ sessionId: sessionId.id });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}