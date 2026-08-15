# US-03 - View expenses history

## User Story

As a Life OS user, I want to see my expense history, so that I can understand how much I have spent and keep track of my spending over time.

## Estado actual / Problem Statement

The Finance concept allows users to record expenses, but there is not yet a defined user-facing expectation for how previously recorded expenses are displayed and reviewed. Without an expense history, users can add individual expenses but cannot easily understand their past spending or review where their money has gone.

## Scope

- Allow the user to access their expense history from the Finance screen through a clear History section or action.
- Display previously recorded expenses in chronological order.
- Show the relevant information for each expense, including expense name, amount, and date.
- Provide a time-period selector with three options: **Weekly, Biweekly, and Monthly**.
- Set **Monthly** as the default time period when the user first accesses the expense history.
- Define **Weekly** as Monday through Sunday.
- Define **Biweekly** as a consecutive 14-day period beginning on a Monday.
- Define **Monthly** as the calendar month from the first through the last day of the month.
- Display the currently selected date range clearly to the user.
- Allow the user to navigate to the previous or next period using previous and next controls.
- Update the expense list and total spending when the selected time period changes.
- Display the total amount spent within the selected time period.
- Allow the user to select an individual expense to view its available details.
- Keep the expense history focused on recorded expenses within Life OS.
- Keep the experience aligned with the calm Life OS visual language.

## Out of Scope

- Custom date-range selection.
- Automatic transaction imports from banks or financial services.
- Advanced financial analytics or forecasting.
- Automatic spending categorization.
- Receipt scanning or receipt history.
- Exporting expenses to external files or services.
- Comparing spending across multiple users or accounts.
- Advanced filtering or search capabilities.
- Changes to an expense's information from the history view unless supported by a separate user story.

## Acceptance Criteria

1. A user can identify a clear way to access their expense history from the Finance screen.
2. The expense history displays previously recorded expenses in chronological order.
3. Each expense displays its name, amount, and date.
4. The user can select one of three time periods: **Weekly, Biweekly, or Monthly**.
5. Monthly is selected by default when the user first accesses the expense history.
6. Weekly represents a period from Monday through Sunday.
7. Biweekly represents a consecutive 14-day period beginning on a Monday.
8. Monthly represents the calendar month from the first through the last day of the month.
9. The currently selected date range is clearly displayed to the user.
10. The user can navigate to the previous or next period using dedicated navigation controls.
11. Changing the selected time period updates the displayed expense list and total spending.
12. The user can see the total amount spent for the selected time period.
13. Selecting an individual expense allows the user to view its available details.
14. Expenses that have been removed do not appear in the expense history.
15. If there are no expenses for the selected time period, the interface clearly communicates that there are no recorded expenses.
16. The expense history does not imply automatic bank synchronization, transaction imports, advanced analytics, custom date ranges, or other financial functionality is already available.
