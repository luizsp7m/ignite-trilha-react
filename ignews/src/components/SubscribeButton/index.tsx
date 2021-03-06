import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

export function SubscribeButton() {
  const { data: session  } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }

    if(session.activeSubscription) {
      router.push('/posts');
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