import Text from '@components/text';
import { PillProps } from './types';
import './pill.css';

export default function Pill({
  active,
  disabled,
  children,
  onClick: handleClick,
}: PillProps) {
  const baseClass = 'lds--pill';
  return (
    <div
      className={`${baseClass}${disabled ? ` ${baseClass}--disabled` : ''}${active ? ` ${baseClass}--active` : ''}`}
      onClick={handleClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <Text success={active} tertiary={disabled} size="sm">
        {children}
      </Text>
    </div>
  );
}
