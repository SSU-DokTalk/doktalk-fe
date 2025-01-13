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
    <div
      {...props}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        borderRadius: "50%",
      }}
    >
      <img
        src={profile ?? userIcon}
        alt="Profile Icon"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          aspectRatio: 1,
        }}
        onError={async (e) => {
          e.currentTarget.src = userIcon;
          e.currentTarget.onerror = null;
        }}
      />
    </div>
  );
}

export default ProfileIcon;
