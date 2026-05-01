import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, ShoppingBag, LogOut,
  RefreshCw, ChevronDown, Search, Bell, Package,
  CheckCircle, Clock, Truck, XCircle, Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { ContactRow, OrderRow } from "@/lib/supabase";
import { toast } from "sonner";

type Tab = "overview" | "contacts" | "orders";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-yellow-100 text-yellow-700",
  replied: "bg-green-100 text-green-700",
  pending: "bg-orange-100 text-orange-700",
  confirmed: "bg-blue-100 text-blue-700",
  "in-progress": "bg-purple-100 text-purple-700",
  shipped: "bg-cyan-100 text-cyan-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const ORDER_STATUSES = ["pending", "confirmed", "in-progress", "shipped", "delivered", "cancelled"] as const;

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchContact, setSearchContact] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoadingContacts(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load contacts.");
    else setContacts(data as ContactRow[]);
    setLoadingContacts(false);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load orders.");
    else setOrders(data as OrderRow[]);
    setLoadingOrders(false);
  }, []);

  useEffect(() => { fetchContacts(); fetchOrders(); }, [fetchContacts, fetchOrders]);

  const markContact = async (id: string, status: ContactRow["status"]) => {
    const { error } = await supabase.from("contacts").update({ status }).eq("id", id);
    if (error) toast.error("Update failed.");
    else { toast.success("Status updated."); fetchContacts(); }
  };

  const updateOrderStatus = async (id: string, status: OrderRow["status"]) => {
    const { error } = await supabase.from("orders").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error("Update failed.");
    else { toast.success("Order status updated."); fetchOrders(); }
  };

  const handleSignOut = async () => { await signOut(); navigate("/admin"); };

  const filteredContacts = contacts.filter((c) =>
    `${c.name} ${c.email} ${c.message}`.toLowerCase().includes(searchContact.toLowerCase())
  );
  const filteredOrders = orders.filter((o) =>
    `${o.customer_name} ${o.customer_email} ${o.id}`.toLowerCase().includes(searchOrder.toLowerCase())
  );

  const newContacts = contacts.filter((c) => c.status === "new").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-foreground text-primary-foreground flex flex-col z-40 shadow-elevated hidden lg:flex">
        <div className="p-6 border-b border-primary-foreground/10">
          <img src="/logo.png" alt="Framez Studio" className="h-10 brightness-0 invert mb-1" />
          <p className="text-primary-foreground/40 text-xs font-body mt-2">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {([
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "contacts", label: "Contact Inquiries", icon: MessageSquare, badge: newContacts },
            { id: "orders", label: "Orders", icon: ShoppingBag, badge: pendingOrders },
          ] as const).map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body transition-all ${
                tab === id
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <Icon size={18} />
              {label}
              {!!badge && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <p className="text-primary-foreground/40 text-xs font-body truncate mb-3">{user?.email}</p>
          <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-primary-foreground/60 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all font-body">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-soft">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground capitalize">
              {tab === "overview" ? "Dashboard Overview" : tab === "contacts" ? "Contact Inquiries" : "Orders"}
            </h1>
            <p className="text-xs text-muted-foreground font-body">Framez Studio Admin</p>
          </div>
          <div className="flex items-center gap-3">
            {newContacts > 0 && (
              <div className="relative">
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">{newContacts}</span>
              </div>
            )}
            <button onClick={() => { fetchContacts(); fetchOrders(); }} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <RefreshCw size={16} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Inquiries", value: contacts.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "New Inquiries", value: newContacts, icon: Bell, color: "text-orange-600", bg: "bg-orange-50" },
                  { label: "Total Orders", value: orders.length, icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 shadow-soft border border-border">
                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent contacts */}
              <div className="bg-white rounded-xl shadow-soft border border-border overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-semibold text-foreground">Recent Inquiries</h2>
                  <button onClick={() => setTab("contacts")} className="text-xs text-primary hover:underline font-body">View all</button>
                </div>
                <div className="divide-y divide-border">
                  {contacts.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-start gap-4 p-4 hover:bg-secondary/30 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm flex-shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-foreground font-body">{c.name}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate font-body">{c.message}</p>
                      </div>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap font-body">
                        {new Date(c.created_at).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="text-sm text-muted-foreground text-center py-8 font-body">No inquiries yet.</p>}
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-xl shadow-soft border border-border overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h2 className="font-display font-semibold text-foreground">Recent Orders</h2>
                  <button onClick={() => setTab("orders")} className="text-xs text-primary hover:underline font-body">View all</button>
                </div>
                <div className="divide-y divide-border">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag size={16} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground font-body">{o.customer_name}</p>
                        <p className="text-xs text-muted-foreground font-body">{o.items?.length ?? 0} item(s)</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-sm text-muted-foreground text-center py-8 font-body">No orders yet.</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── CONTACTS ── */}
          {tab === "contacts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  placeholder="Search by name, email or message…"
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {loadingContacts ? (
                <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="bg-white rounded-xl shadow-soft border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50 border-b border-border">
                          {["Name", "Email", "Message", "Status", "Date", "Actions"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredContacts.map((c) => (
                          <tr key={c.id} className="hover:bg-secondary/20 transition-colors">
                            <td className="px-4 py-3 font-medium text-foreground font-body whitespace-nowrap">{c.name}</td>
                            <td className="px-4 py-3 text-muted-foreground font-body">{c.email || "—"}</td>
                            <td className="px-4 py-3 text-muted-foreground font-body max-w-[240px]">
                              <p className="truncate">{c.message}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-body text-xs">
                              {new Date(c.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                {c.status === "new" && (
                                  <button onClick={() => markContact(c.id, "read")} className="px-2 py-1 text-xs rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors font-body">
                                    Mark Read
                                  </button>
                                )}
                                {c.status !== "replied" && (
                                  <button onClick={() => markContact(c.id, "replied")} className="px-2 py-1 text-xs rounded bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-body">
                                    Replied
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredContacts.length === 0 && (
                          <tr><td colSpan={6} className="text-center py-12 text-muted-foreground font-body">No inquiries found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── ORDERS ── */}
          {tab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  placeholder="Search by name, email or order ID…"
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {loadingOrders ? (
                <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((o) => (
                    <div key={o.id} className="bg-white rounded-xl shadow-soft border border-border overflow-hidden">
                      {/* Order header */}
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-secondary/20 transition-colors"
                        onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Package size={18} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-foreground font-body">{o.customer_name}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-body mt-0.5">
                            {o.items?.length ?? 0} item(s) · {new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <ChevronDown size={16} className={`text-muted-foreground transition-transform flex-shrink-0 ${expandedOrder === o.id ? "rotate-180" : ""}`} />
                      </div>
                      {/* Order detail */}
                      <AnimatePresence>
                        {expandedOrder === o.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-border"
                          >
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 font-body">Customer</p>
                                  <p className="text-sm text-foreground font-body">{o.customer_name}</p>
                                  {o.customer_email && <p className="text-xs text-muted-foreground font-body">{o.customer_email}</p>}
                                  {o.customer_phone && <p className="text-xs text-muted-foreground font-body">{o.customer_phone}</p>}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 font-body">Delivery Address</p>
                                  <p className="text-sm text-foreground font-body">{o.address}</p>
                                </div>
                                {o.message && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 font-body">Customer Note</p>
                                    <p className="text-sm text-foreground font-body italic">{o.message}</p>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-body">Items Ordered</p>
                                  <div className="space-y-2">
                                    {o.items?.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm">
                                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-xs flex items-center justify-center font-bold">{item.quantity}</span>
                                        <span className="text-foreground font-body">{item.product_name}</span>
                                        {item.customization && <span className="text-muted-foreground text-xs font-body">({item.customization})</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-body">Update Status</p>
                                  <select
                                    value={o.status}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderRow["status"])}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
                                  >
                                    {ORDER_STATUSES.map((s) => (
                                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                    ))}
                                  </select>
                                </div>
                                <p className="text-[11px] text-muted-foreground font-body">Order ID: {o.id.slice(0, 8)}…</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-soft border border-border py-16 text-center">
                      <ShoppingBag size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground font-body">No orders yet.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
