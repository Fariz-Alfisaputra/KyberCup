import { Head } from '@inertiajs/react';
import { BarChart2, CheckCircle2, Clock, Trophy, Users } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import AdminLayout from '@/layouts/AdminLayout';

interface DashboardStats {
    total_tournaments: number;
    active_tournaments: number;
    total_teams: number;
    total_users: number;
    total_registrations: number;
    pending_registrations: number;
}

interface ChartDataItem {
    name: string;
    value: number;
    color?: string;
}

interface MonthlyData {
    month: string;
    count: number;
}

interface RecentRegistration {
    id: number;
    status: string;
    created_at: string;
    team: { id: number; nama_tim: string };
    tournament: { id: number; nama: string };
}

interface AdminDashboardProps {
    stats: DashboardStats;
    tournamentStatusDistribution: ChartDataItem[];
    tournamentsPerMonth: MonthlyData[];
    teamsPerGame: ChartDataItem[];
    recentRegistrations: RecentRegistration[];
}

const statCards = [
    {
        key: 'total_tournaments',
        label: 'Total Turnamen',
        icon: Trophy,
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
    },
    {
        key: 'active_tournaments',
        label: 'Turnamen Aktif',
        icon: BarChart2,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
    },
    {
        key: 'total_teams',
        label: 'Total Tim',
        icon: Users,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    {
        key: 'total_users',
        label: 'Total User',
        icon: Users,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
    },
    {
        key: 'total_registrations',
        label: 'Total Pendaftaran',
        icon: CheckCircle2,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
    },
    {
        key: 'pending_registrations',
        label: 'Pending',
        icon: Clock,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
    },
];

const statusBadge = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    approved: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400',
};

export default function AdminDashboard({
    stats,
    tournamentStatusDistribution,
    tournamentsPerMonth,
    teamsPerGame,
    recentRegistrations,
}: AdminDashboardProps) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard - EsportHub" />

            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        const value = stats[card.key as keyof DashboardStats];

                        return (
                            <div
                                key={card.key}
                                className="rounded-xl border border-border bg-card p-4"
                            >
                                <div
                                    className={`mb-3 inline-flex rounded-lg p-2 ${card.bg}`}
                                >
                                    <Icon className={`h-4 w-4 ${card.color}`} />
                                </div>
                                <p className="text-2xl font-black text-foreground">
                                    {value}
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {card.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Tournaments per Month */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="mb-4 text-sm font-bold text-foreground">
                            Turnamen per Bulan
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={tournamentsPerMonth}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="oklch(0.2 0.015 260)"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{
                                        fontSize: 11,
                                        fill: 'oklch(0.62 0.02 260)',
                                    }}
                                />
                                <YAxis
                                    tick={{
                                        fontSize: 11,
                                        fill: 'oklch(0.62 0.02 260)',
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            'oklch(0.12 0.012 260)',
                                        border: '1px solid oklch(0.2 0.015 260)',
                                        borderRadius: '8px',
                                        color: 'oklch(0.95 0.01 260)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="oklch(0.65 0.27 281.7)"
                                    strokeWidth={2}
                                    dot={{
                                        fill: 'oklch(0.65 0.27 281.7)',
                                        r: 4,
                                    }}
                                    name="Turnamen"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Status Distribution */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="mb-4 text-sm font-bold text-foreground">
                            Status Turnamen
                        </h3>
                        {tournamentStatusDistribution.length > 0 ? (
                            <div className="flex items-center gap-6">
                                <ResponsiveContainer width="50%" height={180}>
                                    <PieChart>
                                        <Pie
                                            data={tournamentStatusDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {tournamentStatusDistribution.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={entry.color}
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    'oklch(0.12 0.012 260)',
                                                border: '1px solid oklch(0.2 0.015 260)',
                                                borderRadius: '8px',
                                                color: 'oklch(0.95 0.01 260)',
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex-1 space-y-2">
                                    {tournamentStatusDistribution.map(
                                        (item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between text-xs"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-2.5 w-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                        }}
                                                    />
                                                    <span className="text-muted-foreground">
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <span className="font-bold text-foreground">
                                                    {item.value}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-40 items-center justify-center">
                                <p className="text-sm text-muted-foreground">
                                    Belum ada data
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Teams per Game Bar Chart */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-4 text-sm font-bold text-foreground">
                        Partisipasi per Game
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={teamsPerGame}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="oklch(0.2 0.015 260)"
                            />
                            <XAxis
                                dataKey="name"
                                tick={{
                                    fontSize: 11,
                                    fill: 'oklch(0.62 0.02 260)',
                                }}
                            />
                            <YAxis
                                tick={{
                                    fontSize: 11,
                                    fill: 'oklch(0.62 0.02 260)',
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'oklch(0.12 0.012 260)',
                                    border: '1px solid oklch(0.2 0.015 260)',
                                    borderRadius: '8px',
                                    color: 'oklch(0.95 0.01 260)',
                                }}
                            />
                            <Bar
                                dataKey="count"
                                fill="oklch(0.765 0.177 162.48)"
                                radius={[4, 4, 0, 0]}
                                name="Tim"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Registrations */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-4 text-sm font-bold text-foreground">
                        Pendaftaran Terbaru
                    </h3>
                    {recentRegistrations.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border border-border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                                            Tim
                                        </th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                                            Turnamen
                                        </th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                                            Status
                                        </th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                                            Waktu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRegistrations.map((reg) => (
                                        <tr
                                            key={reg.id}
                                            className="border-b border-border/50 last:border-0 hover:bg-muted/10"
                                        >
                                            <td className="px-4 py-3 font-medium text-foreground">
                                                {reg.team.nama_tim}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {reg.tournament.nama}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[reg.status as keyof typeof statusBadge]}`}
                                                >
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-muted-foreground">
                                                {reg.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Belum ada pendaftaran.
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
