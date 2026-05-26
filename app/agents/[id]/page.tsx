// app/agents/[id]/page.tsx

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import HomeSidebar from "@/components/nav/HomeSidebar";
import AgentBio from "@/components/agents/AgentBio";
import AgentContactCard from "@/components/agents/AgentContactCard";
import AgentProfileHeader from "@/components/agents/AgentProfileHeader";
import AgentStats from "@/components/agents/AgentStats";

type AgentDetail = {
  id: string;
  name: string;
  title: string;
  location: string;
  specialty: string;
  sales: string;
  rating: string;
  phone: string;
  email: string;
  gradient: string;
  backgroundGradient: string;
  activeListings: number;
  bio: string;
  highlights: string[];
};

type AgentDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const agents: AgentDetail[] = [
  {
    id: "agent-001",
    name: "Ava Reynolds",
    title: "Senior Residential Agent",
    location: "Bismarck, ND",
    specialty: "Single-family homes",
    sales: "$18M+",
    rating: "4.9",
    phone: "(701) 555-0148",
    email: "ava@dakotarealty.ai",
    activeListings: 12,
    gradient:
      "linear-gradient(135deg, rgba(250,103,129,0.92), rgba(255,154,172,0.72))",
    backgroundGradient:
      "linear-gradient(135deg, rgba(250,103,129,0.9), rgba(255,154,172,0.74)), radial-gradient(circle at 20% 20%, rgba(255,255,255,.92), transparent 16rem)",
    bio:
      "Ava helps buyers and sellers navigate the residential market with a calm, data-informed approach. She specializes in single-family homes, move-up buyers, relocation support, and clean listing strategies built around modern digital search behavior.",
    highlights: [
      "Residential buying strategy",
      "Seller preparation",
      "Relocation support",
      "Family home specialist",
    ],
  },
  {
    id: "agent-002",
    name: "Marcus Hale",
    title: "Commercial Property Advisor",
    location: "Mandan, ND",
    specialty: "Retail & office spaces",
    sales: "$24M+",
    rating: "5.0",
    phone: "(701) 555-0194",
    email: "marcus@dakotarealty.ai",
    activeListings: 9,
    gradient:
      "linear-gradient(135deg, rgba(31,31,36,0.9), rgba(250,103,129,0.72))",
    backgroundGradient:
      "linear-gradient(135deg, rgba(31,31,36,0.9), rgba(250,103,129,0.74)), radial-gradient(circle at 25% 20%, rgba(255,255,255,.78), transparent 15rem)",
    bio:
      "Marcus focuses on commercial property strategy for business owners, investors, and landlords. His work centers on retail spaces, office suites, lease positioning, traffic visibility, and long-term property value.",
    highlights: [
      "Retail leasing",
      "Office space strategy",
      "Commercial valuation",
      "Business site selection",
    ],
  },
  {
    id: "agent-003",
    name: "Sofia Bennett",
    title: "Luxury Listing Specialist",
    location: "Fargo, ND",
    specialty: "Luxury homes & condos",
    sales: "$31M+",
    rating: "4.9",
    phone: "(701) 555-0182",
    email: "sofia@dakotarealty.ai",
    activeListings: 7,
    gradient:
      "linear-gradient(135deg, rgba(184,80,116,0.92), rgba(250,103,129,0.7))",
    backgroundGradient:
      "linear-gradient(135deg, rgba(127,37,61,0.92), rgba(250,103,129,0.76)), radial-gradient(circle at 25% 20%, rgba(255,255,255,.86), transparent 15rem)",
    bio:
      "Sofia works with luxury buyers, premium sellers, and high-end condo clients who need strong presentation, market positioning, privacy-aware communication, and polished listing experiences.",
    highlights: [
      "Luxury listings",
      "Premium buyer matching",
      "Condo strategy",
      "High-end staging guidance",
    ],
  },
  {
    id: "agent-004",
    name: "Noah Carter",
    title: "Land & Investment Agent",
    location: "Lincoln, ND",
    specialty: "Land, lots & investment",
    sales: "$15M+",
    rating: "4.8",
    phone: "(701) 555-0127",
    email: "noah@dakotarealty.ai",
    activeListings: 15,
    gradient:
      "linear-gradient(135deg, rgba(255,250,247,0.95), rgba(250,103,129,0.62))",
    backgroundGradient:
      "linear-gradient(135deg, rgba(255,250,247,0.96), rgba(250,103,129,0.7)), radial-gradient(circle at 75% 75%, rgba(184,49,82,.5), transparent 15rem)",
    bio:
      "Noah helps clients evaluate land, build-ready lots, acreage, investment parcels, and income opportunities. His process focuses on site potential, long-term growth, and practical next steps.",
    highlights: [
      "Land evaluation",
      "Investment property search",
      "Development potential",
      "Acreage and lots",
    ],
  },
];

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params;
  const agent = getAgentById(id);

  if (!agent) {
    return <MissingAgent />;
  }

  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <AgentProfileHeader agent={agent} />

        <section className="agent-detail-content">
          <div className="app-container">
            <AgentStats
              sales={agent.sales}
              rating={agent.rating}
              specialty={agent.specialty}
              activeListings={agent.activeListings}
            />

            <div className="agent-detail-content__grid mt-4">
              <div className="agent-detail-content__main">
                <AgentBio
                  name={agent.name}
                  bio={agent.bio}
                  highlights={agent.highlights}
                />
              </div>

              <aside className="agent-detail-content__sidebar">
                <AgentContactCard agent={agent} />
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MissingAgent() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <section className="agent-profile-header">
          <div className="app-container">
            <div className="listing-detail__missing-card glass-card-strong">
              <span className="brand-kicker">Agent not found</span>

              <h1>This agent profile could not be found.</h1>

              <p>
                The profile may have been removed, or the agent ID may be
                incorrect.
              </p>

              <Link href="/agents" className="listing-detail__back-link">
                <FiArrowLeft />
                Back to agents
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id);
}