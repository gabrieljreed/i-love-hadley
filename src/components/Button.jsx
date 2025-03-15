export default function Button({ children, ...props }) {
  return (
    <button
      className="text-white px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 focus:ring-4 focus:ring-white/50 transition-all"
      {...props}
    >
      {children}
    </button>
  );
}
