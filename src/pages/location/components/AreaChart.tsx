import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart as ShadCnAreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;
const AreaChart = ({ data, config, chartKey, setChartKey }: any) => {
  console.log(data);

  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription className="mt-2">
            Select a reading and see its data
          </CardDescription>
        </div>
        <SelectSensor chartKey={chartKey} setChartKey={setChartKey} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className=" aspect-video h-52 w-full">
          <ShadCnAreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient
                id={"fill" + chartKey}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${chartKey})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${chartKey})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey={chartKey}
              type="natural"
              fill={`url(#fill${chartKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${chartKey})`}
              stackId="a"
            />
          </ShadCnAreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          {/* <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};
const SelectSensor = ({
  chartKey,
  setChartKey,
}: {
  chartKey: string;
  setChartKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      defaultValue={chartKey}
      onValueChange={(value) => setChartKey(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a sensor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sensors</SelectLabel>
          <SelectItem key={"aqi"} value={"AQI"}>
            Air quality index
          </SelectItem>
          <SelectItem key={"dustPercentage"} value={"dustPercentage"}>
            Pollution Percentage
          </SelectItem>
          <SelectItem key={"temperatureC"} value={"temperatureC"}>
            Temperature
          </SelectItem>
          <SelectItem key={"humidity"} value={"humidity"}>
            Humidity
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default AreaChart;
