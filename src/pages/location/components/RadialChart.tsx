import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "../../../components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { DataReadingKey } from "../../../interfaces/global";
import { readingColor, readingStatus } from "../../../helper/reading";
import { useState } from "react";
const chartConfig = {
  visitors: {
    label: "Data reading",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function RadialChart({
  value,
  readType,
  readKey,
}: {
  value: number;
  readType: string;
  readKey: DataReadingKey;
}) {
  const chartData = [
    { browser: "chrome", value, fill: readingColor(value, readKey) },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{readType}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={value}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {readType}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <p
          style={{ color: readingColor(value, readKey) }}
          className="w-fit mx-auto mb-4 text-center text-lg font-bold rounded-sm p-2"
        >
          {readingStatus(value, readKey)}
        </p>
      </CardContent>
    </Card>
  );
}
