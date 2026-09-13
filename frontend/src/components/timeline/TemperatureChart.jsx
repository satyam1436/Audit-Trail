import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

const UPPER_THRESHOLD = 8.0;

function formatAxisTime(isoString) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFullTime(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Finds the closest telemetry point to a given timestamp - used to
// position markers for events that don't carry their own temperature
// reading (e.g. SEAL_BREACH), per SRS: never fabricate a value.
function findNearestReading(series, targetTimestamp) {
  if (!series || series.length === 0) return null;
  const targetTime = new Date(targetTimestamp).getTime();

  return series.reduce((closest, point) => {
    const pointTime = new Date(point.timestamp).getTime();
    const closestTime = new Date(closest.timestamp).getTime();
    return Math.abs(pointTime - targetTime) < Math.abs(closestTime - targetTime)
      ? point
      : closest;
  }, series[0]);
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  const isAboveThreshold = point.temperature > UPPER_THRESHOLD;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-md p-2.5 text-xs shadow-lg">
      <p className="text-slate-400 font-mono mb-1">{formatFullTime(point.timestamp)}</p>
      <p className={`font-semibold ${isAboveThreshold ? "text-rose-400" : "text-teal-400"}`}>
        {point.temperature}°C
      </p>
      <p className="text-slate-500 mt-1">
        {isAboveThreshold ? "Above threshold" : "Within safe range"}
      </p>
    </div>
  );
}

function TemperatureChart({ temperatureSeries, criticalEvents }) {
  if (!temperatureSeries || temperatureSeries.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No telemetry data available for this shipment.
      </div>
    );
  }

  // Position each critical event marker on the curve using the nearest
  // real telemetry reading - never an invented value.
  const eventMarkers = (criticalEvents || []).map((event) => {
    const nearestPoint = findNearestReading(temperatureSeries, event.timestamp);
    return {
      ...event,
      markerTimestamp: nearestPoint.timestamp,
      markerTemperature: nearestPoint.temperature,
    };
  });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
        Sensor Telemetry
      </h2>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={temperatureSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatAxisTime}
              stroke="#64748b"
              tick={{ fontSize: 10, fontFamily: "monospace" }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 10, fontFamily: "monospace" }}
              unit="°C"
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={UPPER_THRESHOLD}
              stroke="#f59e0b"
              strokeDasharray="6 4"
              label={{
                value: `${UPPER_THRESHOLD}°C threshold`,
                position: "insideTopRight",
                fill: "#f59e0b",
                fontSize: 10,
              }}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#2dd4bf"
              strokeWidth={2}
              dot={{ r: 2, fill: "#2dd4bf" }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />

            {eventMarkers.map((marker) => (
              <ReferenceDot
                key={marker.eventId}
                x={marker.markerTimestamp}
                y={marker.markerTemperature}
                r={6}
                fill="#e11d48"
                stroke="#0f172a"
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TemperatureChart;