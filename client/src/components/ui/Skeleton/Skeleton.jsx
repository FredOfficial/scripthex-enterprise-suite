import "./Skeleton.css";

const Skeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "8px",
}) => {
  return (
    <div
      className="sh-skeleton"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
