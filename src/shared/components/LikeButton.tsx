import { Heart } from 'lucide-react';
import { Button } from '@/design-system';
import * as s from './LikeButton.css';

type LikeButtonProps = {
  liked: boolean;
  /** 개수를 포함한 문구 (좋아요 42) */
  label: string;
  disabled?: boolean;
  onToggle: () => void;
};

/** 좋아요 토글. 누른 상태는 aria-pressed와 채운 하트로 보여줘요. */
export function LikeButton({
  liked,
  label,
  disabled,
  onToggle,
}: LikeButtonProps) {
  return (
    <Button
      variant='plain'
      aria-pressed={liked}
      disabled={disabled}
      className={liked ? s.liked : undefined}
      onClick={onToggle}
    >
      <Heart aria-hidden='true' />
      {label}
    </Button>
  );
}
