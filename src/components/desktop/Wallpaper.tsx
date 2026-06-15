export default function Wallpaper() {
  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/HomeImg.jpg')",
        imageRendering: "auto",
      }}
      aria-hidden="true"
    />
  );
}
