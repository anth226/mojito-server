import * as gql from "../__generated__/resolvers-types"
import * as types from "../../types"
import { UNAUTHORIZED_ERROR } from "./errors"
import dayjs from "dayjs"

export const getMetricsToDate: gql.QueryResolvers["metricsToDate"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.MetricsToDate | null> => {
    const metricsForCurrentPeriod = await getMetricsToDateForPeriod(
        context,
        args.period,
        false
    )
    const metricsForLastPeriod = await getMetricsToDateForPeriod(
        context,
        args.period,
        true
    )

    for (const metric of metricsForCurrentPeriod.metrics) {
        metric.lastPeriodValue =
            metricsForLastPeriod.metrics.find(
                (m) =>
                    m.type === metric.type &&
                    m.connectionId === metric.connectionId
            )?.value || 0
    }

    return metricsForCurrentPeriod
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

async function getMetricsToDateForPeriod(
    context: types.RequestContext,
    period: gql.MetricToDatePeriod,
    last: boolean
): Promise<gql.MetricsToDate> {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    function getPeriod(unit: dayjs.QUnitType): [Date, Date] {
        const startOfPeriod = last
            ? dayjs.utc().subtract(1, unit).startOf(unit).toDate()
            : dayjs.utc().startOf(unit).toDate()
        const endOfPeriod = last
            ? dayjs.utc().subtract(1, unit).endOf(unit).toDate()
            : dayjs.utc().subtract(1, "day").endOf("day").toDate()

        return [startOfPeriod, endOfPeriod]
    }

    let startOfPeriod: Date
    let endOfPeriod = dayjs.utc().subtract(1, "day").endOf("day").toDate()
    switch (period) {
        case gql.MetricToDatePeriod.QuarterToDate:
            ;[startOfPeriod, endOfPeriod] = getPeriod("quarter")
            break
        case gql.MetricToDatePeriod.YearToDate:
            ;[startOfPeriod, endOfPeriod] = getPeriod("year")
            break
        case gql.MetricToDatePeriod.MonthToDate:
            ;[startOfPeriod, endOfPeriod] = getPeriod("month")
            break
    }

    const [allMetrics, _] = await context.datasources.metric.search({
        agencyId: context.user.agencyId,
        businessId: context.user.businessId,
        inRange: { from: startOfPeriod, to: endOfPeriod },
    })

    const metricsByConnection = new Map<string, [types.Metric]>()
    const metricsAllConnections = new Map<string, [types.Metric]>()

    for (const metric of allMetrics) {
        aggregateMetricByKey(
            metricByConnectionForPeriodKey(metric, period),
            metric,
            metricsByConnection
        )
        aggregateMetricByKey(
            metricAllConnectionsForPeriodKey(metric, period),
            metric,
            metricsAllConnections
        )
    }

    const metrics = accumulateMetrics(metricsByConnection).concat(
        accumulateMetrics(metricsAllConnections)
    )

    return { metrics }
}

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

function metricByConnectionForPeriodKey(
    metric: types.Metric,
    period: string
): string {
    return `Y${metric.type}/${metric.connectionId}/${period}`
}

function metricAllConnectionsForPeriodKey(
    metric: types.Metric,
    period: string
): string {
    return `Y${metric.type}/${period}`
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
