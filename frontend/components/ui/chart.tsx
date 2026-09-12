'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error('useChart must be used within ChartContainer');
  return context;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = 'ChartContainer';

export function ChartStyle({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) {
  const colorConfig = Object.entries(config).filter(
    ([, value]) => value.color || value.theme
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, selector]) => `
${selector} [data-chart="${id}"] {
${colorConfig
  .map(([key, value]) => {
    const color =
      value.theme?.[theme as keyof typeof THEMES] || value.color;
    return color ? `--color-${key}: ${color};` : '';
  })
  .join('\n')}
}`
          )
          .join('\n'),
      }}
    />
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean;
    payload?: any[];
    label?: React.ReactNode;
    formatter?: any;
    labelFormatter?: any;
    labelClassName?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'dot' | 'line' | 'dashed';
    color?: string;
    nameKey?: string;
    labelKey?: string;
  }
>(
  (
    {
      active,
      payload = [],
      label,
      formatter,
      labelFormatter,
      labelClassName,
      hideLabel = false,
      hideIndicator = false,
      indicator = 'dot',
      color,
      nameKey,
      labelKey,
      className,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || payload.length === 0) return null;

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || payload.length === 0) return null;

      const item = payload[0];
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const value =
        !labelKey && typeof label === 'string'
          ? config[label]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn('font-medium', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      return value ? (
        <div className={cn('font-medium', labelClassName)}>{value}</div>
      ) : null;
    }, [
      payload,
      label,
      labelFormatter,
      labelClassName,
      hideLabel,
      config,
      labelKey,
    ]);

    const nestedLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {!nestedLabel && tooltipLabel}

        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor =
              color || item.payload?.fill || item.color;

            return (
              <div
                key={index}
                className={cn(
                  'flex w-full gap-2',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            'shrink-0 rounded-[2px]',
                            indicator === 'dot' && 'h-2.5 w-2.5',
                            indicator === 'line' && 'w-1',
                            indicator === 'dashed' &&
                              'w-0 border-[1.5px] border-dashed bg-transparent'
                          )}
                          style={{
                            backgroundColor: indicatorColor,
                            borderColor: indicatorColor,
                          }}
                        />
                      )
                    )}

                    <div className="flex flex-1 justify-between">
                      <div className="grid gap-1">
                        {nestedLabel && tooltipLabel}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>

                      {item.value !== undefined && (
                        <span className="font-mono tabular-nums">
                          {Number(item.value).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = 'ChartTooltipContent';

export const ChartLegend = RechartsPrimitive.Legend;

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: any[];
    verticalAlign?: 'top' | 'bottom';
    hideIcon?: boolean;
    nameKey?: string;
  }
>(
  (
    {
      payload = [],
      verticalAlign = 'bottom',
      hideIcon = false,
      nameKey,
      className,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!payload.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}
      >
        {payload.map((item: any, index: number) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div key={index} className="flex items-center gap-1.5">
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}

              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = 'ChartLegendContent';

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (!payload || typeof payload !== 'object') return undefined;

  const payloadData = payload.payload;

  let configKey = key;

  if (typeof payload[key] === 'string') {
    configKey = payload[key];
  } else if (
    payloadData &&
    typeof payloadData[key] === 'string'
  ) {
    configKey = payloadData[key];
  }

  return config[configKey] || config[key];
}