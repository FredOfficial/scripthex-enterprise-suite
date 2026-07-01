import { Skeleton } from "../../../components/ui";

const EmployeeSkeleton = () => {
  return (
    <div className="employee-skeleton-table">
      {[1, 2, 3, 4, 5].map((row) => (
        <div className="employee-skeleton-row" key={row}>
          <Skeleton height="18px" width="90%" />
          <Skeleton height="18px" width="95%" />
          <Skeleton height="18px" width="70%" />
          <Skeleton height="18px" width="80%" />
          <Skeleton height="24px" width="70px" borderRadius="999px" />
          <Skeleton height="18px" width="80%" />
          <Skeleton height="32px" width="120px" borderRadius="10px" />
        </div>
      ))}
    </div>
  );
};

export default EmployeeSkeleton;
