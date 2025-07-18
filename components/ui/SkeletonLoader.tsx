
const SkeletonLoader = () => (
    <div className="animate-pulse rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="w-full h-40 bg-gray-300"></div>
        <div className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        </div>
    </div>
);

export default SkeletonLoader;
