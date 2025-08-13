import { useState } from 'react';

import Image from 'next/image';

import cn from 'classnames';

import styles from './styles.module.scss';


interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  online?: boolean;
  className?: string;
}

export const Avatar = ({
  src = '/avatar.png',
  name = 'Заур П.',
  size = 'medium',
  online = false,
  className
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  

  const getInitials = () => {
    const names = name.split(' ');
    return names
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };


  const sizeMap: Record<string, number> = {
    small: 32,
    medium: 44,
    large: 64
  };
  
  const avatarSize = sizeMap[size];
  return (
    <div className={cn(styles.index, className)} tabIndex={6}>
      <div className={cn(styles.avatar, styles[size])}>
        {src && !imageError ? (
          <Image
            src={src}
            alt={`Аватар ${name}`}
            className={styles.image}
            width={avatarSize}
            height={avatarSize}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.fallback}>
            {getInitials()}
          </div>
        )}
        
        {online && <span className={styles.onlineIndicator} />}
      </div>
      
      {name && <span className={styles.name}>{name}</span>}
    </div>
  );
};