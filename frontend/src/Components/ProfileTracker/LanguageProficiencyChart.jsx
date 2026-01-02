import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Color mapping for different languages
const colorMap = {
  JavaScript: "#facc15", // Yellow
  Java: "#60a5fa",       // Blue
  Python: "#34d399",     // Green
  CSS: "#10b981",
  HTML: "#ef4444",
};

export default function LanguageProficiencyChart({ data }) {
  const formattedData = data
    .map((item) => ({
      language: item.language,
      value: parseFloat(item.percentage),
      color: colorMap[item.language] || "#8b5cf6",
    }))
    .filter((item) => item.value > 0);

  return (
    <Card className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-200">
          Language Proficiency
        </CardTitle>
        <p className="text-sm text-gray-400">
          Based on GitHub activity
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* BAR */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
          <ResponsiveContainer width="100%" height={60}>
            <BarChart
              layout="vertical"
              data={[
                {
                  name: "Languages",
                  ...formattedData.reduce(
                    (acc, cur) => ({ ...acc, [cur.language]: cur.value }),
                    {}
                  ),
                },
              ]}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" hide />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                  fontSize: "12px",
                }}
              />
              {formattedData.map((entry, index) => (
                <Bar
                  key={index}
                  dataKey={entry.language}
                  stackId="1"
                  barSize={18}
                  radius={[6, 6, 6, 6]}
                >
                  <Cell fill={entry.color} />
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <div className="flex flex-wrap gap-4">
          {formattedData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-300 font-medium">
                {item.language}
              </span>
              <span className="text-sm text-gray-400">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
