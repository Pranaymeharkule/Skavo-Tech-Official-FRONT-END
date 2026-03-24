export default function GlassCard({children}) {
 return (
  <div className="glass rounded-3xl p-8 shadow-xl hover:scale-[1.03] transition">
   {children}
  </div>
 );
}