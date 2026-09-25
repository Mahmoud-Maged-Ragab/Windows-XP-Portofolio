export default function BootScreen({
  message = "Loading Windows XP...",
}: {
  message?: string;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-screen h-screen"
      style={{ background: "#3a7ebf" }}
    >
      <div className="text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/WindowsXPICon.png" className="w-12 h-12 mx-auto mb-4 object-contain" alt="" />
        <p className="text-lg font-bold">{message}</p>
        <div className="mt-4 flex gap-1 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white/60 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
