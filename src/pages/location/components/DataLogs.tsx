import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { IData } from "../../../services/api/interfaces";

export default function DataLogs({ data }: { data: IData[] }) {
  return (
    <Table className="min-w-full">
      <TableCaption>قائمة باخر القراءات الخاصة بك</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[110px] text-right">التاريخ</TableHead>
          <TableHead className="text-right">جودة الهواء</TableHead>
          <TableHead className="text-right">الحرارة سليزي</TableHead>
          <TableHead className="text-right">نسبة الرطوبة</TableHead>
          <TableHead className="text-right">نسبة التوث</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">
              {c.createdAt.toString()}
            </TableCell>
            <TableCell>
              {c.AQI} {c.AQIStatus}
            </TableCell>
            <TableCell>{c.temperatureC || 0} C</TableCell>
            <TableCell>{c.humidity || 0} %</TableCell>
            <TableCell>{c.dustPercentage || 0} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
