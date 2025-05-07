"use client"

import { useRouter } from 'next/navigation';

import { useState } from "react"
import {
  Bell,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Calendar,
  Filter,
  Check,
  Clock,
  ChevronDown,
  X,
  ArrowLeft,
} from "lucide-react"

// Define notification types
type NotificationType = "transaction" | "alert" | "update" | "reminder"

// Define notification interface
interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  type: NotificationType
  isRead: boolean
  actionUrl?: string
}

const NotificationsPage = () => {
  // Mock notifications data
  const initialNotifications: Notification[] = [
    {
      id: "1",
      title: "Large Transaction Alert",
      message: "A transaction of ₵2,500 was made from your Ecobank account.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: "alert",
      isRead: false,
      actionUrl: "/accounts",
    },
    {
      id: "2",
      title: "Bill Payment Reminder",
      message: "Your electricity bill of ₵120 is due in 3 days. Set up automatic payment to avoid late fees.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: "reminder",
      isRead: false,
      actionUrl: "/accounts",
    },
    {
      id: "3",
      title: "Savings Goal Achieved",
      message: "Congratulations! You've reached your emergency fund savings goal of ₵5,000.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      type: "update",
      isRead: true,
      actionUrl: "/accounts",
    },
    {
      id: "4",
      title: "New Transaction",
      message: "You received a deposit of ₵3,500 from 'ACME Corporation'.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      type: "transaction",
      isRead: true,
      actionUrl: "/accounts",
    },
    {
      id: "5",
      title: "Security Alert",
      message: "Your account password was changed. If this wasn't you, please contact support immediately.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      type: "alert",
      isRead: true,
      actionUrl: "/accounts",
    },
    {
      id: "6",
      title: "Budget Alert",
      message: "You've spent 90% of your dining budget for this month.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      type: "alert",
      isRead: true,
      actionUrl: "/accounts",
    },
    {
      id: "7",
      title: "New Feature Available",
      message: "You can now set up recurring transfers between your accounts. Try it now!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      type: "update",
      isRead: true,
      actionUrl: "/accounts",
    },
    {
      id: "8",
      title: "Account Statement Ready",
      message: "Your February 2023 account statement is now available for download.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      type: "update",
      isRead: true,
      actionUrl: "/accounts",
    },
  ]

  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  // State for filter
  const [filter, setFilter] = useState<NotificationType | "all">("all")

  // State for showing filter dropdown
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Get filtered notifications
  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((notification) => notification.type === filter)

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  // Function to delete a notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Function to get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "transaction":
        return <CreditCard className="h-5 w-5 text-blue-600" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "update":
        return <TrendingUp className="h-5 w-5 text-emerald-600" />
      case "reminder":
        return <Calendar className="h-5 w-5 text-amber-600" />
      default:
        return <Bell className="h-5 w-5 text-slate-600" />
    }
  }

  // Function to format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "Just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return days === 1 ? "Yesterday" : `${days} days ago`
    }
  }
  const router = useRouter();

  return (
    <div className="pt-16 flex flex-col min-h-screen bg-slate-50">
        
      <div className="md:mx-8 mx-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
          <div>
            <button
            onClick={() => router.back()}
            className="inline-flex items-center text-lg text-blue-600 hover:text-blue-800 mb-6"
            >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-500 mt-1">Stay updated with your account activity</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                <Check className="h-4 w-4" />
                <span>Mark all as read</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-sm text-slate-700"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilter("all")
                        setShowFilterDropdown(false)
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${filter === "all" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      All notifications
                      {filter === "all" && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("transaction")
                        setShowFilterDropdown(false)
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${filter === "transaction" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      Transactions
                      {filter === "transaction" && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("alert")
                        setShowFilterDropdown(false)
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${filter === "alert" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      Alerts
                      {filter === "alert" && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("update")
                        setShowFilterDropdown(false)
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${filter === "update" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      Updates
                      {filter === "update" && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                    <button
                      onClick={() => {
                        setFilter("reminder")
                        setShowFilterDropdown(false)
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${filter === "reminder" ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      Reminders
                      {filter === "reminder" && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notification count summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">All</p>
                <p className="text-2xl font-bold text-slate-900">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600 bg-blue-100 p-1.5 rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Unread</p>
                <p className="text-2xl font-bold text-slate-900">{unreadCount}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600 bg-amber-100 p-1.5 rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Alerts</p>
                <p className="text-2xl font-bold text-slate-900">
                  {notifications.filter((n) => n.type === "alert").length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600 bg-red-100 p-1.5 rounded-full" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Updates</p>
                <p className="text-2xl font-bold text-slate-900">
                  {notifications.filter((n) => n.type === "update").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600 bg-emerald-100 p-1.5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Notifications list */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No notifications</h3>
              <p className="text-slate-500">
                {filter === "all"
                  ? "You don't have any notifications at the moment."
                  : `You don't have any ${filter} notifications at the moment.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 md:p-6 hover:bg-slate-50 transition-colors ${!notification.isRead ? "bg-blue-50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "transaction"
                          ? "bg-blue-100"
                          : notification.type === "alert"
                            ? "bg-red-100"
                            : notification.type === "update"
                              ? "bg-emerald-100"
                              : "bg-amber-100"
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 flex items-center">
                            {notification.title}
                            {!notification.isRead && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>}
                          </h3>
                          <p className="text-slate-600 mt-1">{notification.message}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 whitespace-nowrap">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View details
                          </a>
                        )}

                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                            className="text-sm text-slate-600 hover:text-slate-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
