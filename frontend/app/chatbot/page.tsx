"use client"
import { SendHorizontal, Bot, Plus, Trash2, Menu, X } from "lucide-react"
import type React from "react"
import { useState, useRef, useEffect } from "react"

// Define message types
type MessageType = "bot" | "user"

// Define message interface
interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
}

// Predefined questions
const predefinedQuestions = [
  "How much did I spend on groceries last month?",
  "How much should I be saving for retirement?",
  "Can I afford a vacation if I save 10% of my income every month?",
  "What's my current account balance?",
  "How can I reduce my monthly expenses?",
]

// Bot responses for predefined questions
const botResponses: Record<string, string> = {
  "How much did I spend on groceries last month?":
    "Based on your transaction history, you spent ₵450.75 on groceries last month. This is about 15% of your total monthly expenses.",

  "How much should I be saving for retirement?":
    "Financial experts typically recommend saving 15-20% of your income for retirement. Based on your current income of ₵5,200 per month, you should aim to save between ₵780 and ₵1,040 monthly for retirement.",

  "Can I afford a vacation if I save 10% of my income every month?":
    "If you save 10% of your monthly income (₵520), you could save ₵3,120 in 6 months. Based on average vacation costs in Ghana, this should be sufficient for a nice local getaway. For international travel, you might need to save for 10-12 months.",

  "What's my current account balance?":
    "Your current account balance is ₵4,250.75. You also have ₵249.25 in pending transactions.",

  "How can I reduce my monthly expenses?":
    "Looking at your spending patterns, I notice you spend ₵350 monthly on subscription services. Consider reviewing these subscriptions and canceling ones you don't use regularly. You also spent ₵480 on dining out last month, which could be reduced by cooking more meals at home.",
}

// Mock conversation history
const mockConversations = [
  { id: "1", title: "Financial Planning", date: "Today" },
  { id: "2", title: "Budget Analysis", date: "Yesterday" },
  { id: "3", title: "Retirement Planning", date: "Mar 15" },
]

const Chatbot = () => {
  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey Thierry 👋! I'm your financial assistant Manex. How can I help you today?",
      type: "bot",
      timestamp: new Date(),
    },
  ])

  // State for input text
  const [inputText, setInputText] = useState("")

  // State for typing indicator
  const [isTyping, setIsTyping] = useState(false)

  // State for sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(false)

  // State to track if user has started a conversation
  const [conversationStarted, setConversationStarted] = useState(false)

  // Ref for chat container to auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Ref for textarea to auto-resize
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (inputText.trim() === "") return
  
    setConversationStarted(true)
  
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      type: "user",
      timestamp: new Date(),
    }
  
    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)
  
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.content }),
      })
  
      const data = await response.json()
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || "Sorry, I couldn't understand that.",
        type: "bot",
        timestamp: new Date(),
      }
  
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Oops! Something went wrong. Please try again.",
        type: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Function to handle predefined question click
  const handleQuestionClick = (question: string) => {
    setInputText(question)

    // Focus the textarea
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputText])

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Sidebar - hidden on mobile by default */}
      <div
        className={`bg-white border-r border-slate-200 w-64 flex-shrink-0 fixed md:static inset-y-0 left-0 z-20 transform ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <button className="flex items-center gap-2 text-slate-900 font-medium hover:bg-slate-100 p-2 rounded-md w-full">
              <Plus className="h-4 w-4" />
              <span>New chat</span>
            </button>
            <button className="md:hidden" onClick={toggleSidebar}>
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <div className="mb-4">
              <h2 className="text-xs font-medium text-slate-500 px-2 mb-2">Recent conversations</h2>
              <div className="space-y-1">
                {mockConversations.map((convo) => (
                  <button
                    key={convo.id}
                    className="w-full text-left p-2 rounded-md hover:bg-slate-100 text-sm text-slate-900 flex justify-between items-center"
                  >
                    <span className="truncate">{convo.title}</span>
                    <span className="text-xs text-slate-500">{convo.date}</span>
                  </button>
                ))}
              </div>
            </div>


          </div>

          <div className="p-3 border-t border-slate-200">
            <button className="flex items-center gap-2 text-slate-700 hover:bg-slate-100 p-2 rounded-md w-full text-sm">
              <Trash2 className="h-4 w-4" />
              <span>Clear conversations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <button onClick={toggleSidebar} className="text-slate-500">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div className="ml-2">
              <h1 className="text-sm font-semibold text-slate-900">Manex</h1>
            </div>
          </div>
          <div className="w-5"></div> {/* Spacer for centering */}
        </div>

        {/* Chat messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`py-6 px-4 md:px-8 ${message.type === "bot" ? "bg-white" : "bg-slate-50"}`}
            >
              <div className="max-w-3xl mx-auto flex items-start gap-4">
                {message.type === "bot" ? (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white">
                    <span className="text-sm font-medium">T</span>
                  </div>
                )}
                <div className="flex-1 text-slate-800">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Suggested questions in main area (only shown before conversation starts) */}
          {!conversationStarted && (
            <div className="py-4 px-4 md:px-8 bg-white">
              <div className="max-w-3xl mx-auto">
                <p className="text-sm font-medium text-slate-700 mb-3">Suggested questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {predefinedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleQuestionClick(question)
                        handleSendMessage()
                      }}
                      className="text-left p-3 rounded-lg border border-slate-200 text-sm text-slate-800 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="py-6 px-4 md:px-8 bg-white">
              <div className="max-w-3xl mx-auto flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="relative rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Manex..."
                    className="w-full p-3 pr-12 focus:outline-none resize-none max-h-32 min-h-[44px] text-slate-800"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputText.trim() === ""}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-md ${
                      inputText.trim() === "" ? "text-slate-400" : "text-blue-600 hover:bg-blue-50"
                    } transition-colors`}
                  >
                    <SendHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-2">
                Manex can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
