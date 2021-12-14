import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton() {
  const { data: session  } = useSession();

  console.log(session);

  return session ? (
    <button className={styles.signInButton} type="button">
      <FaGithub color="#04d301" />
      {session.user.name}
      <FiX
        className={styles.closeIcon}
        color="#737380"
        onClick={() => signOut()}
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sign In with Github
    </button>
  );
}