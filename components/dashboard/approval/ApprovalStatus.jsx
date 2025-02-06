const ApprovalStatus = ({ approval }) => {

    
    if (!approval) return null;

    const { approval_status, approval_title, approval_comment } = approval;
    const statusConfig = {
        pending: { bgColor: "bg-orange-400", text: `در انتظار تایید به دلیل : ${approval_title}`, extraClass: process.env.NEXT_PUBLIC_DIRECTION },
        rejected: { bgColor: "bg-red-400", text: `رد شده به دلیل : ${approval_comment}`, extraClass: process.env.NEXT_PUBLIC_DIRECTION }
    };

    const config = statusConfig[approval_status];
    if (!config) return null;

    return (
        <div className={`flex ${config.bgColor} p-3 rounded-md justify-center ${config.extraClass || ""}`}>
            <div className="flex w-fit items-center">{config.text}</div>
        </div>
    );
};

export default ApprovalStatus;
