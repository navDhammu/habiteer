import Card from '../../components/ui/Card';

export default function StatCard({ icon: Icon, title, stat }) {
   return (
      <Card className="flex flex-col items-center justify-center gap-2 sm:w-40">
         <Icon size="2.5em" />
         <div className="text-center text-sm text-gray-700">{title}</div>
         <div className="text-3xl text-slate-800">{stat}</div>
      </Card>
   );
}
