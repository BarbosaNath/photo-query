import Text from '@components/text';
import { PillProps } from './types';
import './pill.css';
import { useState } from 'react';

export default function Pill({
  active,
  disabled,
  children,
  hoverColor = 'default',
  hoverComponent: hoverText,
  onClick: handleClick,
}: PillProps) {
  const baseClass = 'lds--pill';

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`${baseClass}${disabled ? ` ${baseClass}--disabled` : ''}${active ? ` ${baseClass}--active` : ''} ${baseClass}--hover--${hoverColor}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Text success={active} tertiary={disabled} size="sm">
        {isHovering ? (hoverText ?? children) : children}
      </Text>
    </div>
  );
}
