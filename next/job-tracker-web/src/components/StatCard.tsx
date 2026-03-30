interface StatCardProps {
  label: string;
  count: number;
  color: string;
}

export default function StatCard({ label, count, color }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${color} p-5`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </div>
  );
}
