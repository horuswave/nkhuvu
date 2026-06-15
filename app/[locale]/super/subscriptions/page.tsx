import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import AdminPageShell, {
  AdminSection,
} from "@/components/admin/AdminPageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, User, Package, CheckCircle, XCircle, Clock } from "lucide-react";

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: {
      adminUser: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      },
      package: {
        select: {
          id: true,
          name: true,
          price: true,
          currency: true,
          maxEvents: true,
          maxGuests: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
    EXPIRED: "bg-red-100 text-red-800 border-red-200",
    CANCELLED: "bg-stone-100 text-stone-800 border-stone-200",
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    ACTIVE: <CheckCircle size={16} />,
    EXPIRED: <XCircle size={16} />,
    CANCELLED: <XCircle size={16} />,
    PENDING: <Clock size={16} />,
  };

  return (
    <AdminPageShell
      title="Subscriptions"
      description="View and manage all user subscriptions"
    >
      <AdminSection title={`All Subscriptions (${subscriptions.length})`}>
        {subscriptions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <CreditCard size={48} className="text-stone-300 mb-4" />
              <p className="text-stone-500 font-medium mb-2">No subscriptions yet</p>
              <p className="text-sm text-stone-400">
                Subscriptions will appear here when users purchase packages
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold text-lg">
                        {subscription.adminUser.name?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-stone-900">
                            {subscription.adminUser.name || "Unknown User"}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-md border ${statusColors[subscription.status]}`}
                          >
                            {statusIcons[subscription.status as keyof typeof statusIcons]}
                            {subscription.status}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500 mb-2">
                          {subscription.adminUser.email}
                        </p>
                        <p className="text-xs text-stone-400">
                          Account created:{" "}
                          {new Date(subscription.adminUser.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Package Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                        <Package size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-900 mb-1">
                          {subscription.package.name}
                        </h4>
                        <p className="text-lg font-bold text-amber-600">
                          {subscription.package.currency}{" "}
                          {subscription.package.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {subscription.package.maxEvents === 999999
                              ? "Unlimited"
                              : `${subscription.package.maxEvents} events`}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {subscription.package.maxGuests === 999999
                              ? "Unlimited"
                              : `${subscription.package.maxGuests} guests`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="flex items-start gap-4 lg:min-w-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 mb-1">Started</p>
                        <p className="text-sm font-medium text-stone-700">
                          {new Date(subscription.startDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                        {subscription.endDate && (
                          <>
                            <p className="text-xs text-stone-400 mb-1 mt-2">
                              Ends
                            </p>
                            <p className="text-sm font-medium text-stone-700">
                              {new Date(subscription.endDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </>
                        )}
                        {subscription.mpesaTransactionId && (
                          <>
                            <p className="text-xs text-stone-400 mb-1 mt-2">
                              M-Pesa Transaction
                            </p>
                            <p className="text-xs font-mono text-stone-600">
                              {subscription.mpesaTransactionId}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AdminSection>
    </AdminPageShell>
  );
}
