// app/agents/page.tsx

import AgentSpotlight from "@/components/agents/AgentSpotlight";
import HomeSidebar from "@/components/nav/HomeSidebar";

export default function AgentsPage() {
  return (
    <main className="main-shell">
      <HomeSidebar />

      <div className="with-home-sidebar">
        <section className="agents-page-hero">
          <div className="app-container">
            <div className="agents-page-hero__content">
              <span className="brand-kicker">Dakota Realty team</span>

              <h1>
                Meet the agents helping buyers, sellers, and investors move
                smarter.
              </h1>

              <p>
                Connect with local real estate specialists across residential,
                commercial, luxury, land, and investment properties.
              </p>
            </div>
          </div>
        </section>

        <AgentSpotlight />
      </div>
    </main>
  );
}