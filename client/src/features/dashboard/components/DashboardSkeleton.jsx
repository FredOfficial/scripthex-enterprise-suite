import { Skeleton } from "../../../components/ui";

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="dashboard-skeleton-stats">
        {[1, 2, 3, 4].map((item) => (
          <div className="dashboard-skeleton-card" key={item}>
            <Skeleton width="58px" height="58px" borderRadius="16px" />

            <div>
              <Skeleton width="90px" height="14px" />
              <Skeleton width="60px" height="28px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
