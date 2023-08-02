import * as gql from "../__generated__/resolvers-types"
import * as types from "../../types"
import { UNAUTHORIZED_ERROR } from "./errors"
import dayjs from "dayjs"

async function getMetricsYearlyForYear(
    context: types.RequestContext,
    year: number
): Promise<gql.MetricsYearly> {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const startOfYear = dayjs.utc(year.toString(), "YYYY").startOf("year")
    const endOfYear = dayjs.utc(year.toString(), "YYYY").endOf("year")

    const [allMetrics, _] = await context.datasources.metric.search({
        agencyId: context.user.agencyId,
        businessId: context.user.businessId,
        inRange: { from: startOfYear.toDate(), to: endOfYear.toDate() },
    })

    const metricsByConnectionPerMonth = new Map<string, [types.Metric]>()
    const metricsAllConnectionsPerMonth = new Map<string, [types.Metric]>()
    const metricsByConnectionForYear = new Map<string, [types.Metric]>()
    const metricsAllConnectionsForYear = new Map<string, [types.Metric]>()

    for (const metric of allMetrics) {
        aggregateMetricByKey(
            metricByConnectionPerMonthKey(metric),
            metric,
            metricsByConnectionPerMonth
        )
        aggregateMetricByKey(
            metricAllConnectionsPerMonthKey(metric),
            metric,
            metricsAllConnectionsPerMonth
        )
        aggregateMetricByKey(
            metricAllConnectionsForYearKey(metric),
            metric,
            metricsAllConnectionsForYear
        )
        aggregateMetricByKey(
            metricByConnectionForYearKey(metric),
            metric,
            metricsByConnectionForYear
        )
    }

    const metricsPerMonth = accumulateMetrics(
        metricsByConnectionPerMonth
    ).concat(accumulateMetrics(metricsAllConnectionsPerMonth))

    const metricsForYear = accumulateMetrics(metricsByConnectionForYear).concat(
        accumulateMetrics(metricsAllConnectionsForYear)
    )

    return {
        metricsForYear,
        metricsPerMonth,
    }
}

export const getMetricsYearly: gql.QueryResolvers["metricsYearly"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.MetricsYearly | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const metricsYearlyForCurrentYear = await getMetricsYearlyForYear(
        context,
        args.fromYear
    )
    const metricsYearlyForLastYear = await getMetricsYearlyForYear(
        context,
        args.fromYear - 1
    )

    for (const metric of metricsYearlyForCurrentYear.metricsForYear) {
        metric.lastPeriodValue =
            metricsYearlyForLastYear.metricsForYear.find(
                (m) =>
                    m.type === metric.type &&
                    m.connectionId === metric.connectionId &&
                    m.year === metric.year!! - 1
            )?.value || 0
    }

    for (const metric of metricsYearlyForCurrentYear.metricsPerMonth) {
        metric.lastPeriodValue =
            metricsYearlyForLastYear.metricsPerMonth.find(
                (m) =>
                    m.type === metric.type &&
                    m.connectionId === metric.connectionId &&
                    m.month === metric.month
            )?.value || 0
    }

    return metricsYearlyForCurrentYear
}

function metricByConnectionPerMonthKey(metric: types.Metric): string {
    return `M${metric.type}/${metric.connectionId}/${metric.from.getUTCMonth()}`
}

function metricAllConnectionsPerMonthKey(metric: types.Metric): string {
    return `M${metric.type}/${metric.from.getUTCMonth()}`
}

function metricByConnectionForYearKey(metric: types.Metric): string {
    return `Y${metric.type}/${
        metric.connectionId
    }/${metric.from.getUTCFullYear()}`
}

function metricAllConnectionsForYearKey(metric: types.Metric): string {
    return `Y${metric.type}/${metric.from.getUTCFullYear()}`
}

function aggregateMetricByKey(
    key: string,
    metric: types.Metric,
    aggregation: Map<string, [types.Metric]>
) {
    const metrics = aggregation.get(key)
    if (metrics) {
        metrics.push(metric)
    } else {
        aggregation.set(key, [metric])
    }
}

function accumulateMetrics(
    aggregation: Map<string, [types.Metric]>
): Array<gql.Metric> {
    const acc = new Array<gql.Metric>()
    for (const [key, metrics] of aggregation) {
        const totalValue = metrics
            .map((m) => m.value)
            .reduce((acc, curr) => acc + curr, 0)

        const isAllConnectionsKey = key.split("/").length === 2
        const isForYearKey = key[0] === "Y"

        acc.push({
            connectionId: isAllConnectionsKey ? null : metrics[0].connectionId,
            month: isForYearKey ? null : metrics[0].from.getUTCMonth(),
            type: metrics[0].type,
            value: totalValue,
            lastPeriodValue: 0,
            year: metrics[0].from.getUTCFullYear(),
            createdAt: metrics[0].createdAt.toISOString(),
        })
    }

    return acc
}
