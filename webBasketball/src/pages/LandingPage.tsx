import avg3ptPercentage from '../data/avg_3pt_percentage.csv';

import { CartesianGrid, Line, LineChart, XAxis, ReferenceLine, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartData {
  year: number,
  year_number: number,
  poly_fit: number,
  log_fit: number,
  avg3pt_percentage: number,
}

const chartData = avg3ptPercentage.map((d: ChartData) => ({
  year: d.year,
  year_number: d.year_number,
  poly_fit: d.poly_fit,
  log_fit: d.log_fit,
  avg3pt_percentage: d.avg3pt_percentage,
}))

const chartConfig = {
  poly_fit: {
    label: "Polynomial fit",
    color: "var(--chart-1)",
    
  },
  log_fit: {
    label: "Logarithmic fit",
    color: "var(--chart-2)",
  },
  avg3pt_percentage: {
    label: "Average 3pt %",
    color: "var(--chart-3)",
  },

} satisfies ChartConfig

console.log(avg3ptPercentage)

function LandingPage() {
  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <div className='text-center font-bold text-3xl width-full'>
        Predicting three point percentage and attempts
      </div>
      <Card className="w-full max-w-3xl">
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full overflow-x-auto">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
  
            >
  
              <CartesianGrid stroke='white' opacity={0.1} strokeDasharray={"3 3"}/>
              <XAxis
                dataKey="year"
                axisLine={true}
                tickLine={true}
                tickMargin={12}
                label={{fill: "white", value: "Year", position: "bottom", offset: 5}}
                stroke='white'
                tick={{stroke: "white", fontWeight: "lighter"}}
              />
              <YAxis
                axisLine={true}
                tickLine={true}
                tickMargin={12}
                label={{fill: "white", value: "Percentage", position: "left", angle: -90, offset: 5}}
                stroke='white'
                tick={{stroke: "white", fontWeight: "lighter"}}

                
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="poly_fit"
                stroke={chartConfig.poly_fit.color}
                strokeWidth={2}
                strokeDasharray={"3 3"}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="avg3pt_percentage"
                stroke={chartConfig.avg3pt_percentage.color}
                strokeWidth={2}
                dot={false}
              />
            <ReferenceLine x="2023" stroke="white" label={{value: "Start of Predicted Data", position: "left", color: "white"}} opacity={0.3} />
            </LineChart>
            </ChartContainer>
            <CardFooter>
              <div className="text-center text-sm text-gray-300">
                The shooting percentage has had an impressive trajectory. When I started this investigation I assumed that the three point shooting percentage would see a similar pattern to its attempts, I was wrong. We'll go step by step on how we made our predictions using python.
              </div>
            </CardFooter>
        </CardContent>

      </Card>

    </div>
  );
}

export default LandingPage;