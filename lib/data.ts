import type {Application, DashboardMetric} from './types';


export const dashboardMetrics: DashboardMetric[] = [
    {
        title: "Applications",
        value: 24,
        subtitle: "+3 this week",
    },
    {
        title: "Interviews",
        value: 5,
        subtitle: "2 upcoming",
    },
    {
        title: "Offers",
        value: 1,
        subtitle: "1 active offer",
    },
    {
        title: "Follow-Ups Due",
        value: 3,
        subtitle: "Need action soon",
    },
];
export const applications: Application[] = [
    {
        id: "1",
        company: "Shopify",
        role: "Frontend Developer",
        status: "Applied",
        dateApplied: "2026-05-01",
        nextAction: "Follow up on 2026-05-08",
    },
    {
        id: "2",
        company: "Hootsuite",
        role: "Software Developer",
        status: "Interview",
        dateApplied: "2026-04-28",
        nextAction: "Technical interview on 2026-05-09",
    },
    {
        id: "3",
        company: "RBC",
        role: "Full-Stack Developer",
        status: "Wishlist",
        dateApplied: "2026-05-03",
        nextAction: "Tailor resume",
    },
    {
        id: "4",
        company: "OpenText",
        role: "Backend Developer",
        status: "Rejected",
        dateApplied: "2026-04-20",
        nextAction: "Archive application",
    },
    {
        id: "5",
        company: "Wealthsimple",
        role: "Software Engineer",
        status: "Offer",
        dateApplied: "2026-04-15",
        nextAction: "Review offer details",
    },
];