import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button type="button" className={styles.signInButton} onClick={() => signOut()}>
      <FaGithub color="#00ff88" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
      <FaGithub color="#6c43c8" />
      Sign in with Github
    </button>
  );
}
