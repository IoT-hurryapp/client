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
const AreaChart = ({ data, config, chartKey, setChartKey }: any) => {
  return (
    <Card className="my-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>المخطط البياني</CardTitle>
          <CardDescription className="mt-2">
            اخترا حساسا لعرض بياناته
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
        <SelectValue placeholder="اختر حساسا" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>الحساسات</SelectLabel>
          <SelectItem key={"aqi"} value={"AQI"}>
            فهرس جودة الهواء
          </SelectItem>
          <SelectItem key={"dustPercentage"} value={"dustPercentage"}>
            نسبة التلوث
          </SelectItem>
          <SelectItem key={"temperatureC"} value={"temperatureC"}>
            الحرارة
          </SelectItem>
          <SelectItem key={"humidity"} value={"humidity"}>
            الرطوبة
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default AreaChart;
