import { Link } from '@tanstack/react-router';
import styles from './SideMenu.module.css';

export function SideMenu () {
  return (
    <div className={styles.sideMenu}>
      <Link to="/admin">Admin</Link>
      <Link to="/teacher">Teacher</Link>
      <Link to="/learn">Learn</Link>
    </div>
  );
}
