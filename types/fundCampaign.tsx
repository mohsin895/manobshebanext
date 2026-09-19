export type FundCampaignStat = {
  icon: string | null
  label: string
  value: string
}

export type FundCampaignTimelineItem = {
  dateLabel: string
  title: string
  description: string
}

export type FundCampaignGalleryItem = {
  imageUrl: string
  caption: string | null
}

export type FundCampaignTier = {
  title: string
  amount: string
}

export type FundCampaignHelpSection = {
  title: string
  description: string
  ctaText: string
  footnote: string
  tiers: FundCampaignTier[]
}

export type FundCampaign = {
  id: number
  title: string
  imageUrl: string
  sectionTitle: string
  description: string
  timelineTitle: string
  timeline: FundCampaignTimelineItem[]
  stats: FundCampaignStat[]
  gallery: FundCampaignGalleryItem[]
  helpSection: FundCampaignHelpSection
}
