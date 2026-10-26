const platformColors: Record<string, string> = {
  instagram: 'bg-pink-500/20 text-pink-200 border-pink-500/30',
  facebook: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  x: 'bg-slate-500/20 text-slate-200 border-slate-500/30',
  linkedin: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30',
  tiktok: 'bg-violet-500/20 text-violet-200 border-violet-500/30',
  whatsapp: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
  all: 'bg-brand-500/20 text-brand-100 border-brand-500/30',
};

export const platforms = [
  { id: 'all', name: 'All Channels' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'x', name: 'X / Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'whatsapp', name: 'WhatsApp' },
];

export const accounts = [
  { id: 'inst-main', platform: 'instagram', name: '@aurora.style', status: 'Live', followers: '148K', value: '$21.4K', uptime: '99.2%' },
  { id: 'fb-main', platform: 'facebook', name: 'Aurora Beauty', status: 'Connected', followers: '94K', value: '$14.8K', uptime: '97.8%' },
  { id: 'x-main', platform: 'x', name: '@aurorabrand', status: 'Live', followers: '33K', value: '$9.1K', uptime: '98.6%' },
  { id: 'li-main', platform: 'linkedin', name: 'Aurora HQ', status: 'Reviewing', followers: '16K', value: '$6.7K', uptime: '96.9%' },
  { id: 'tt-main', platform: 'tiktok', name: '@auroraofficial', status: 'Live', followers: '264K', value: '$27.9K', uptime: '99.1%' },
  { id: 'wa-main', platform: 'whatsapp', name: 'Support Channel', status: 'Connected', followers: '2.4K', value: '$5.3K', uptime: '99.8%' },
];

export const inbox = [
  { id: 'msg-1', platform: 'instagram', customer: 'Nadia M.', preview: 'Can you ship this bundle to Dubai?', sentiment: 'Positive', status: 'New', time: '2 min ago' },
  { id: 'msg-2', platform: 'facebook', customer: 'Hanif T.', preview: 'The ad creative is working, what about a retargeting offer?', sentiment: 'Warm', status: 'Replying', time: '8 min ago' },
  { id: 'msg-3', platform: 'x', customer: 'Lina P.', preview: 'Do you have a B2B package for agencies?', sentiment: 'Neutral', status: 'Queued', time: '18 min ago' },
  { id: 'msg-4', platform: 'linkedin', customer: 'Moez A.', preview: 'Looking for a partnership on content distribution', sentiment: 'Positive', status: 'Qualified', time: '28 min ago' },
  { id: 'msg-5', platform: 'whatsapp', customer: 'Aisha S.', preview: 'We need the catalog link and stock availability', sentiment: 'Urgent', status: 'New', time: '41 min ago' },
  { id: 'msg-6', platform: 'tiktok', customer: 'Teo V.', preview: 'Please tag us in the next creator campaign', sentiment: 'Positive', status: 'Scheduled', time: '1 hr ago' },
];

export const leads = [
  { id: 'lead-1', name: 'Nadia M.', company: 'Jade Atelier', stage: 'Qualified', score: 92, value: '$4.2K', owner: 'Amina' },
  { id: 'lead-2', name: 'Marcus D.', company: 'Northwind Co.', stage: 'Proposal', score: 85, value: '$7.6K', owner: 'Tariq' },
  { id: 'lead-3', name: 'Lina P.', company: 'Pixel House', stage: 'Discovery', score: 74, value: '$2.9K', owner: 'Amina' },
  { id: 'lead-4', name: 'Moez A.', company: 'Urban Labs', stage: 'Negotiation', score: 88, value: '$11.4K', owner: 'Sam' },
];

export const campaigns = [
  { id: 'camp-1', name: 'Summer Glow Push', status: 'In market', platform: 'Instagram, TikTok', spend: '$2,860', reach: '134K' },
  { id: 'camp-2', name: 'Creator Retargeting', status: 'Reviewing', platform: 'Facebook, IG', spend: '$1,540', reach: '68K' },
  { id: 'camp-3', name: 'B2B Lead Magnet', status: 'Scheduled', platform: 'LinkedIn, X', spend: '$980', reach: '42K' },
];

export const posts = [
  { id: 'post-1', title: 'Glow ritual video', platform: 'Instagram', date: 'Today · 6:00 PM', status: 'Approved' },
  { id: 'post-2', title: 'Behind the scenes', platform: 'TikTok', date: 'Tomorrow · 12:00 PM', status: 'Scheduled' },
  { id: 'post-3', title: 'Customer testimonial', platform: 'Facebook', date: 'Thu · 9:30 AM', status: 'Draft' },
];

export const metrics = [
  { label: 'Engagement', value: '8.6%', delta: '+1.9%' },
  { label: 'Inbox replies', value: '94%', delta: '+7.4%' },
  { label: 'Qualified leads', value: '312', delta: '+21%' },
  { label: 'Revenue tracked', value: '$48.2K', delta: '+13.1%' },
];

export function getPlatformTone(platform: string) {
  return platformColors[platform] ?? platformColors.all;
}
