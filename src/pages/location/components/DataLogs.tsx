import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { IData } from "../../../services/api/interfaces";

export default function TableDemo({ data }: { data: IData[] }) {
  return (
    <Table className="min-w-full">
      <TableCaption>A list of your recent logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Air quality</TableHead>
          <TableHead>Temperature in C</TableHead>
          {/* <TableHead>Temperature in F </TableHead> */}
          <TableHead>Dust Concentration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.connectedDevicesId}>
            <TableCell className="font-medium">
              {c.createdAt.toString()}
            </TableCell>
            <TableCell>
              {c.AQI} {c.AQIStatus}
            </TableCell>
            <TableCell>{c.temperatureC || 0} C</TableCell>
            {/* <TableCell>{c.temperatureF || 0} F</TableCell> */}
            <TableCell>{c.dustPercentage || 0} %</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
