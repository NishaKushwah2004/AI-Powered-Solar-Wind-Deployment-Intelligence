const SuitabilityBadge = ({
  category,
}) => {

  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
      {category}
    </span>
  );
};

export default SuitabilityBadge;