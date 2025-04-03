import "./belts.css";

export default function Belts({
  belts,
  updateSelectedBelt,
  selectedBeltRank,
  isSelectable,
}: BeltsProps) {
  const handleSelectBelt = (belt_rank_order: number) => {
    updateSelectedBelt(belt_rank_order);
  };
  return (
    <>
      <ul className="belts">
        ceinture
        {belts.map((belt) => (
          <button
            key={belt.id}
            type="button"
            aria-label={belt.name}
            value={belt.name}
            id={belt.name}
            className={selectedBeltRank === belt.rank_order ? "selected" : ""}
            onClick={() => handleSelectBelt(belt.rank_order)}
            disabled={!isSelectable}
          >
            <img src={`/${belt.name}.png`} alt="" />
            {/* <p className="skip-link">{belt.name}</p> */}
          </button>
        ))}
      </ul>
    </>
  );
}
