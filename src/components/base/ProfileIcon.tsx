import UserIcon from '@/assets/images/profile.svg?react';
import { useState } from 'react';

function ProfileIcon({
  profile = undefined,
  size = 28,
  ...props
}: {
  profile?: string;
  size?: number;
} & React.HTMLProps<HTMLImageElement>) {
  const [error, setError] = useState(false);

  return (
    <div
      {...props}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        borderRadius: '50%',
      }}
    >
      {profile == undefined || profile == '' || error ? (
        <UserIcon
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            aspectRatio: 1,
          }}
        />
      ) : (
        <img
          src={profile}
          alt='Profile Icon'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            aspectRatio: 1,
          }}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default ProfileIcon;
