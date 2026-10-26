"use client";

import { useMemo, useState } from 'react';
import { accounts, campaigns, getPlatformTone, inbox, leads, metrics, platforms, posts } from '@/data/mockData';

const sidebarItems = [
  'Overview',
  'Inbox',
  'Accounts',
  'Leads',
  'Campaigns',
  'Content',
  'Reports',
  'Automation',
  'Settings',
];

export default function DashboardShell() {
  const [activePlatform, setActivePlatform] = useState('all');
  const [selectedInboxId, setSelectedInboxId] = useState('msg-1');
  const [campaignList, setCampaignList] = useState(campaigns);
  const [leadList, setLeadList] = useState(leads);

  const filteredInbox = useMemo(() => {
    if (activePlatform === 'all') return inbox;
    return inbox.filter((message) => message.platform === activePlatform);
  }, [activePlatform]);

  const currentMessage = filteredInbox.find((item) => item.id === selectedInboxId) ?? filteredInbox[0];

  const updateCampaignStatus = (id: string) => {
    setCampaignList((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'In market' ? 'Reviewing' : 'In market',
            }
          : item,
      ),
    );
  };

  const advanceLead = (id: string) => {
    setLeadList((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextStages = ['Qualified', 'Proposal', 'Negotiation', 'Closed'];
        const currentIndex = nextStages.indexOf(item.stage);
        const nextStage = nextStages[Math.min(currentIndex + 1, nextStages.length - 1)];
        return { ...item, stage: nextStage, score: Math.min(item.score + 8, 100) };
      }),
    );
  };

  const visibleAccounts =
    activePlatform === 'all' ? accounts : accounts.filter((item) => item.platform === activePlatform);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden min-h-[calc(100vh-3rem)] w-72 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl xl:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 text-lg font-black text-white shadow-glow">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Official</p>
              <h1 className="text-xl font-bold">Aurora CRM</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={item}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                  index === 0
                    ? 'bg-brand-500/15 text-brand-100 ring-1 ring-brand-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item}</span>
                {index === 1 && <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200">12</span>}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">System health</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-300">API uptime</span>
              <span className="font-semibold text-emerald-300">99.8%</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Social command center</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Official Dashboard</h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
                  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  All systems online
                </div>
                <button className="rounded-2xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-400">
                  + New Campaign
                </button>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{metric.label}</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">{metric.delta}</span>
                </div>
                <div className="mt-4 text-3xl font-black tracking-tight">{metric.value}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Connected accounts</p>
                  <h3 className="mt-1 text-xl font-bold">Social network overview</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setActivePlatform(platform.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        activePlatform === platform.id
                          ? 'border-brand-500 bg-brand-500/15 text-brand-100'
                          : 'border-white/10 bg-slate-800/80 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleAccounts.map((account) => (
                  <div key={account.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.15em] ${getPlatformTone(account.platform)}`}>
                        {account.platform}
                      </span>
                      <span className="text-xs text-emerald-300">{account.status}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">{account.name}</h4>
                      <p className="text-sm text-slate-400">{account.followers} followers</p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-sm">
                      <div>
                        <p className="text-slate-500">Revenue</p>
                        <p className="font-semibold text-white">{account.value}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Uptime</p>
                        <p className="font-semibold text-white">{account.uptime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Action center</p>
                  <h3 className="mt-1 text-xl font-bold">Quick actions</h3>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Reply to messages',
                  'Approve content',
                  'Schedule post',
                  'Assign lead owner',
                  'Boost campaign',
                ].map((action) => (
                  <button
                    key={action}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-brand-500/40 hover:bg-brand-500/10"
                  >
                    <span>{action}</span>
                    <span className="font-semibold text-brand-200">Run</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Inbox</p>
                  <h3 className="mt-1 text-xl font-bold">Customer conversations</h3>
                </div>
                <button className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300">
                  View all
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.2fr]">
                <div className="space-y-3">
                  {filteredInbox.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelectedInboxId(message.id)}
                      className={`w-full rounded-2xl border p-3 text-left transition ${
                        currentMessage?.id === message.id
                          ? 'border-brand-500/40 bg-brand-500/10'
                          : 'border-white/10 bg-slate-950/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{message.customer}</p>
                          <p className="mt-1 text-xs text-slate-400">{message.platform}</p>
                        </div>
                        <span className="text-[10px] uppercase text-slate-400">{message.time}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-300">{message.preview}</p>
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  {currentMessage ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-white">{currentMessage.customer}</p>
                          <p className="text-sm text-slate-400">{currentMessage.platform}</p>
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${getPlatformTone(currentMessage.platform)}`}>
                          {currentMessage.status}
                        </span>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-300">
                        “Can you ship this bundle to Dubai?”
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-400">
                        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-2">
                          <p className="text-slate-500">Sentiment</p>
                          <p className="mt-1 font-medium text-emerald-300">{currentMessage.sentiment}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-2">
                          <p className="text-slate-500">Priority</p>
                          <p className="mt-1 font-medium text-amber-300">High</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-2">
                          <p className="text-slate-500">Lead</p>
                          <p className="mt-1 font-medium text-cyan-300">New</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {['Reply', 'Assign', 'Create order', 'Mark resolved'].map((label) => (
                          <button
                            key={label}
                            className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 hover:border-brand-500/40 hover:text-white"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-slate-400">No messages in this channel.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pipeline</p>
                    <h3 className="mt-1 text-xl font-bold">Lead funnel</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {leadList.map((lead) => (
                    <div key={lead.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{lead.name}</p>
                          <p className="text-xs text-slate-400">{lead.company}</p>
                        </div>
                        <span className="rounded-full bg-brand-500/10 px-2 py-1 text-[10px] font-medium text-brand-200">{lead.stage}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                        <span>Score: {lead.score}</span>
                        <span>{lead.value}</span>
                      </div>

                      <button
                        onClick={() => advanceLead(lead.id)}
                        className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:text-white"
                      >
                        Advance lead
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Publishing</p>
                    <h3 className="mt-1 text-xl font-bold">Content queue</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-white">{post.title}</p>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200">{post.status}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">{post.platform}</p>
                      <p className="mt-1 text-xs text-slate-500">{post.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Performance</p>
                <h3 className="mt-1 text-xl font-bold">Campaign tracker</h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {campaignList.map((campaign) => (
                <div key={campaign.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-white">{campaign.name}</h4>
                      <p className="mt-1 text-xs text-slate-400">{campaign.platform}</p>
                    </div>
                    <span className="rounded-full bg-sky-500/10 px-2 py-1 text-[10px] text-sky-200">{campaign.status}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Spend</p>
                      <p className="font-semibold text-white">{campaign.spend}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Reach</p>
                      <p className="font-semibold text-white">{campaign.reach}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => updateCampaignStatus(campaign.id)}
                    className="mt-4 w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 hover:border-brand-500/40"
                  >
                    Toggle status
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
