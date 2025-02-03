const ApprovalStatus = ({ approval }) => {
    if (approval.approval_status == "pending") {
        return (
            <div className="flex  bg-orange-400 p-3 rounded-md justify-center">
                <div className="flex w-fit items-center">{`در انتظار تایید به دلیل : ${approval.approval_title}`}</div>
            </div>
        );
    } else if (approval.approval_status == "rejected") {
        return (
            <div className="flex  bg-red-400 p-3 rounded-md justify-center">
                <div className="flex w-fit items-center">{`رد شده به دلیل : ${approval.approval_comment}`}</div>
            </div>
        )
    } else {
        return null
    }
};

export default ApprovalStatus;