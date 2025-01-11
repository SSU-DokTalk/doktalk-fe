import userIcon from "@/assets/images/profile.svg";

function ProfileIcon({
  profile = undefined,
  size = 28,
  ...props
}: {
  profile?: string;
  size?: number;
} & React.HTMLProps<HTMLImageElement>) {
  return (
    <img
      src={profile ?? userIcon}
      alt="Profile Icon"
      {...props}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        objectFit: "cover",
        aspectRatio: 1,
      }}
      onError={async (e) => {
        e.currentTarget.src = userIcon;
        e.currentTarget.onerror = null;
      }}
    />
  );
}

export default ProfileIcon;
