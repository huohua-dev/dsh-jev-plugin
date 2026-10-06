/** Profile settings for skill-catalog filtering and glob-result ranking. */
export interface SelectionConfigValues {
  /** Maximum skill summaries shown after Jev filters the catalogue. */
  skillLimit: number
  /** Relevance probability (0–1) a skill needs to be shown; when none reaches it, no summary is published. */
  skillMinProbability: number
  /** Maximum glob match count eligible for Jev ranking; larger results bypass Jev. */
  fileCandidates: number
  /** Maximum ranked paths shown in a Jev-processed glob result. */
  fileLimit: number
}
