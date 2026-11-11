type Props = { label: string; sub: string; promptId?: string; dive?: number };

export default function PlayCta({ label, sub, promptId, dive }: Props) {
  const qs = promptId
    ? `/?prompt=${encodeURIComponent(promptId)}#game`
    : dive
      ? `/?dive=${dive}#game`
      : `/#game`;
  return (
    <div className="play-cta">
      <a className="btn" href={qs}>{label}</a>
      <span className="small-note">{sub}</span>
    </div>
  );
}