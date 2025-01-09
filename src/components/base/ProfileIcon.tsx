import userIcon from "@/assets/images/profile.svg";
import { useState } from "react";

function ProfileIcon({
  profile = undefined,
  size = 28,
  ...props
}: {
  profile?: string;
  size?: number;
} & React.HTMLProps<HTMLImageElement>) {
  const [isError, setIsError] = useState<boolean>(false);

  const inherentOnError = () => {
    setIsError(true);
  };

  return (
    <img
      src={isError ? userIcon : profile ?? userIcon}
      alt="Profile Icon"
      {...props}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        objectFit: "cover",
        aspectRatio: 1,
      }}
      onError={inherentOnError}
    />
  );
}

export default ProfileIcon;
