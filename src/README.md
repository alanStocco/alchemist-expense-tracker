# Alchemist

**Alchemist** is an app that helps you manage your money.  
Because **money is time**.  
And **time is everything** — the real gold for a modern alchemist.

---

## TODO / To Implement:

1. **Multiple profiles**: personal, couple, family, business.  
   ➤ *Improve*: Integrate a backend API (e.g., Django) to share data with others.  
   *Optional, but possible.*

2. **Multi-currency support**, including custom currencies.  
   ➤ *Improve*: Support Bitcoin/Satoshi with automatic FIAT conversion at the time of spending and the day you see the report.

3. **Macro-categories, sub-categories, and custom tags.**  
   *Optional, but possible.*  
   Two main types(by default):  
   - **Expenses**: e.g., Essentials, Fun, Future You  
   - **Income**: e.g., Salary, Side-job, Investments

4. Each transaction can have a **sub-category** and **tag**. User can create them.
   - Example sub-categories: Groceries, Gym, Car, House, Emergency-fund, etc.
   - Example tags: "bad-habits", "gifts", etc.

5. Ability to set a **total budget** with a date range.  
   - The app calculates the maximum daily spend to stay within budget.  
   - Also supports category-specific budgets (e.g., 50-30-20 rule between Essentials, Fun, Savings).

6. **Data analysis with simple charts.**
   - Show the total spent in that moment compared to the total budget.
   - In detail, show the total spent for each category in a simple chart.
   - Show the 5 most spent categories in a pie chart.

7. Ability to **export data as CSV**.

8. ➤ *Improve*: **Import CSV**:  
   - Download a template file, then import CSV with transactions.

9. Decide if a **large expense** is assigned to a single day or spread across multiple days.

10. Add **recurring expenses and subscriptions**.
