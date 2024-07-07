import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn-components/ui/table";

export interface IData {
  temperature_c: number;
  temperature_f: number;
  mq135_value: number;
  mq135_statys: string;
  dust_concentration: number;
  createdAt: string;
  connectedDevicesId: string;
}
export default function TableDemo({ data }: { data: Array<IData> }) {
  return (
    <Table className="min-w-full">
      <TableCaption>A list of your recent logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Air quality</TableHead>
          <TableHead>Temperature in C</TableHead>
          <TableHead>Temperature in F </TableHead>
          <TableHead>Dust Concentration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.connectedDevicesId}>
            <TableCell className="font-medium">{c.createdAt}</TableCell>
            <TableCell>
              {c.mq135_value} {c.mq135_statys}
            </TableCell>
            <TableCell>{c.temperature_c} C</TableCell>
            <TableCell>{c.temperature_f} F</TableCell>
            <TableCell>{c.dust_concentration} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
