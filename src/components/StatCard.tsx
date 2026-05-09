interface StatCardProps {
  number: string;
  text: string;
}

export function StatCard({ number, text }: StatCardProps) {
  return (
    <div className="relative px-6 lg:px-10 py-8 hover-lift transition-all duration-500 group">
      {/* Massive editorial italic number */}
      <div className="stat-massive">{number}</div>

      {/* Vertical accent rule */}
      <div className="absolute top-8 right-4 lg:right-8 w-px h-20 bg-gradient-to-b from-royal-500/60 to-transparent group-hover:h-32 transition-all duration-500"></div>

      {/* Label */}
      <div className="luxury-label mt-4">{text}</div>
    </div>
  );
}
