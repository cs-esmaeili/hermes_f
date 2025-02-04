const ApprovalStatus = ({ approval }) => {
    const approvalData = approval?.approval;
    if (!approvalData) return null;

    const { status, title, comment } = approvalData;
    const statusConfig = {
        pending: { bgColor: "bg-orange-400", text: `در انتظار تایید به دلیل : ${title}`, extraClass: process.env.NEXT_PUBLIC_DIRECTION },
        rejected: { bgColor: "bg-red-400", text: `رد شده به دلیل : ${comment}`, extraClass: process.env.NEXT_PUBLIC_DIRECTION }
    };

    const config = statusConfig[status];
    if (!config) return null;

    return (
        <div className={`flex ${config.bgColor} p-3 rounded-md justify-center ${config.extraClass || ""}`}>
            <div className="flex w-fit items-center">{config.text}</div>
        </div>
    );
};

export default ApprovalStatus;
