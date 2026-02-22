import { Radio } from '@mantine/core';
import styles from './OptionCard.module.css';

interface OptionCardProps {
  value: string;
  correct: boolean | null;
  disabled: boolean;
  children: React.ReactNode;
}

export function OptionCard ({ value, correct, disabled, children }: OptionCardProps) {
  return (
    <Radio.Card
      value={value}
      className={styles.root}
      data-correct={correct}
      disabled={disabled}
    >
      {children}
    </Radio.Card>
  );
}
