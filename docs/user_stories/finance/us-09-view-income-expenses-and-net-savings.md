# US-09 - View income, expenses, and net savings

## User Story

As a Life OS user, I want to see my income, expenses, and net savings in a graph and as totals, so that I can quickly understand my financial situation and how it changes over time.

## Estado actual / Problem Statement

The Finance concept allows users to record income and expenses, but there is not yet a defined user-facing expectation for how these financial metrics are presented together. Without a clear financial overview, users must review individual income and expense entries to understand how much they earn, spend, and save.

## Scope

- Provide a financial overview within the Finance screen showing **Income, Expenses, and Net Savings**.
- Display the total **Income** for the selected time period.
- Display the total **Expenses** for the selected time period.
- Display the total **Net Savings** for the selected time period.
- Calculate Net Savings as total Income minus total Expenses for the selected time period.
- Display the three totals as separate summary values above or alongside the graph.
- Provide a graph that visually represents Income, Expenses, and Net Savings over the selected time period.
- Use the same time-period selector defined for the expense history: **Weekly, Biweekly, and Monthly**.
- Set **Monthly** as the default time period.
- Allow the user to navigate to the previous or next period.
- Update the totals and graph when the selected time period changes.
- Update the totals and graph when income or expense information is added, edited, or removed.
- Use the financial data already recorded in Life OS as the source for the overview.
- Keep the visualization simple and aligned with the calm Life OS visual language.

## Out of Scope

- Financial forecasting or predictions.
- Investment performance tracking.
- Automatic bank or credit card synchronization.
- Advanced financial analytics.
- Budget recommendations.
- Custom financial formulas or user-defined metrics.
- Exporting the graph or financial data.
- Comparing financial data with external users or benchmarks.
- Custom date-range selection.

## Acceptance Criteria

1. A user can identify a financial overview from the Finance screen showing **Income, Expenses, and Net Savings**.
2. The total Income for the selected time period is clearly displayed.
3. The total Expenses for the selected time period is clearly displayed.
4. The total Net Savings for the selected time period is clearly displayed.
5. Net Savings is calculated as **Income minus Expenses** for the selected time period.
6. Income, Expenses, and Net Savings are displayed as separate summary values.
7. A graph visually represents Income, Expenses, and Net Savings for the selected time period.
8. The user can select **Weekly, Biweekly, or Monthly** as the time period.
9. Monthly is selected by default.
10. The user can navigate to the previous or next period.
11. Changing the selected time period updates both the summary totals and the graph.
12. Adding, editing, or removing an income or expense updates the relevant totals and graph.
13. The overview uses the same recorded income and expense data available elsewhere in the Finance section.
14. If there is insufficient financial data for the selected period, the interface clearly communicates the available data rather than implying missing values are zero.
15. The financial overview does not imply financial forecasting, investment tracking, external synchronization, or advanced financial analytics are already available.
