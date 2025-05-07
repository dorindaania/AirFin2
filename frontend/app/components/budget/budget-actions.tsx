import Link from "next/link"

export default function BudgetActions() {
    // Static data for quick actions
    const actions = [
      {
        title: "Create New Budget",
        description: "Set up a new budget for a specific category or time period",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-900"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        ),
        color: "bg-blue-50 border-blue-100",
        href: "/budget/create",
      },
      {
        title: "Adjust Categories",
        description: "Modify your budget allocation across categories",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        ),
        color: "bg-purple-50 border-purple-100",
        href: "/budget/adjust-categories",
      },
      {
        title: "Set Savings Goal",
        description: "Create a new savings target with timeline",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m16 8-8 8" />
            <path d="m8 8 8 8" />
          </svg>
        ),
        color: "bg-green-50 border-green-100",
        href: "/budget/savings",
      },
      {
        title: "Export Budget Report",
        description: "Download your budget data as PDF or CSV",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
        color: "bg-amber-50 border-amber-100",
        href: "/budget/export",
      },
    ]
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions
          .filter((action) => action.href) // Ensure href is defined
          .map((action, index) => (
            <Link
              key={index}
              href={action.href!} // Non-null assertion since undefined is filtered out
              className={`${action.color} border rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow block`}
            >
            <div className="flex flex-col h-full">
              <div className="mb-4">{action.icon}</div>
              <h3 className="font-medium text-slate-900 mb-1">{action.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{action.description}</p>
              <div className="mt-auto">
                <span className="text-sm font-medium text-slate-600">Get Started →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
  
  